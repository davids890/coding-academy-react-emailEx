import { useState, useEffect } from "react";
import { Outlet, useParams, Link, useNavigate } from "react-router-dom";
import { EmailList } from "../cmps/EmailList";
import { emailService } from "../src/services/email.service.js";
import { EmailFilter } from "../cmps/EmailFilter.jsx";
import { EmailFolderList } from "../cmps/EmailFolderList.jsx";
import { useSearchParams } from "react-router-dom";
import { getExistingProperties } from "../src/services/util.service.js";
import { EmailCompose } from "../cmps/EmailCompose.jsx";
import {
  showErrorMsg,
  showSuccessMsg,
} from "../src/services/event-bus.service.js";

export function EmailIndex() {
  console.log("EmailIndex: ", EmailIndex);
  const [emailList, setEmails] = useState([]);
  const [searchParams, SetSearchParams] = useSearchParams();
  const [filterBy, setFilterBy] = useState(
    emailService.getFilterFromSearchParams(searchParams)
  );
  // const {id, folder, emailId} = useParams()
  const { id, folder, emailId } = useParams();
  const isCompose = searchParams.get("compose");
  const navigate = useNavigate();
  const [unradCount, setUnreadCount] = useState(0);

  useEffect(() => {
    console.log("init... load emails");
    console.log("folder: ", folder);
    loadEmails();
    SetSearchParams(getExistingProperties(filterBy)); // SetSearchParams - put the filterBy values in the url
    // return ()=
  }, [filterBy, folder]);

  useEffect(() => {
    console.log("unradCount: ", unradCount);
    console.log("emailList.length: ", emailList.length);
    setUnreadCount(emailService.countUnreadEmails());
    console.log("unradCount: ", unradCount);
  }, [emailList]);

  async function loadEmails() {
    try {
      const emails = await emailService.query(filterBy, folder);
      setEmails(emails);
    } catch (error) {
      // console.log(error);
      showErrorMsg("Failed to load emails");
    }
  }

  function onFilterBy(filterBy) {
    setFilterBy(filterBy);
  }

  async function onEmailDelete(emailId) {
    const index = emailList.findIndex((email) => email.id === emailId);
    if (index !== -1) {
      const updatedEmailList = [...emailList];
      const emailToRemove = {
        ...updatedEmailList[index],
        removedAt: new Date(),
      };

      // Update the email locally
      updatedEmailList[index] = emailToRemove;
      setEmails(updatedEmailList); // Update the local state immediately

      // Persist the change in storage
      try {
        if (folder === "trash") await emailService.remove(emailToRemove.id);
        else await emailService.save(emailToRemove);
        showSuccessMsg("Email deleted successfully");
        console.log("Email deleted successfully");
        await loadEmails(); // Re-fetch emails to ensure consistency with the server
      } catch (error) {
        // console.error("Failed to delete email:", error);
        showErrorMsg("Failed to delete email: {error}");
      }
    }
  }

  async function onMarkUnread(emailId) {
    try {
      const email = await emailService.getById(emailId);
      const emailCopy = { ...email, isRead: false };
      await emailService.save(emailCopy);
      showSuccessMsg("Email marked as unread");
      await loadEmails();
    } catch (error) {
      showErrorMsg(`Failed to mark email as unread: ${error.message}`);
    }
  }

  async function onStarMark(emailId) {
    try {
      const email = await emailService.getById(emailId);
      const emailCopy = { ...email, isStarred: !email.isStarred };
      await emailService.save(emailCopy);
      showSuccessMsg(emailCopy.isStarred ? "Email starred" : "Email unstarred");
      await loadEmails();
    } catch (error) {
      showErrorMsg(`Failed to update star status: ${error.message}`);
    }
  }

  async function onEmailCompose(email) {
    console.log("on compose email: ", email);
    const isId = searchParams.get("emailId");

    const newEmail = await emailService.save({
      ...email,
      draft: false,
      from: emailService.getCurrentUser().email,
      sentAt: new Date(),
      id: isId,
    });

    console.log("newEmail: ", newEmail);

    const emailIndex = emailList.findIndex((entity) => entity.id === email.id);
    if (emailIndex < 0) {
      // If email is not found, add it as new and log error
      setEmails((prev) => [...prev, newEmail]); // Assuming setEmails is the setter for emailList
    } else {
      // Update the emailList by replacing the old email with the new one
      setEmails((prev) => {
        const updatedEmails = [...prev];
        updatedEmails.splice(emailIndex, 1, newEmail);
        return updatedEmails;
      });
    }
    await loadEmails();
    // third option - the email in the draft and now i want to remove the email from the draft dir (note thing on all the options (startred inbox etc.))
    navigate(`/email/${folder}/`);
  }

  function onExitCompose() {
    navigate(`/email/${folder}/`);
  }

  async function onUpdateEmail(email) {
    console.log("onUpdateEmail: ", email);
    const isId = searchParams.get("emailId");
    console.log("isId: ", isId);
    console.log("emailId: ", emailId);

    const draftedEmail = await emailService.save({
      ...email,
      draft: true,
      from: emailService.getCurrentUser().email,
      id: isId,
    });
    navigate(`/email/${folder}/?compose=edit&emailId=${draftedEmail.id}`);

    // update also the email list in the front
    // option one - loadEmails, option two - don;t load all the email, update by specific scenario ()
    loadEmails();
    // setEmails((prev) => [...prev, email]);
  }

  return (
    <section className="email-index">
      {isCompose && (
        <EmailCompose
          onExitCompose={onExitCompose}
          onEmailCompose={onEmailCompose}
          onUpdateEmail={onUpdateEmail}
        />
      )}
      <EmailFolderList unradCount={unradCount} />
      <EmailFilter filterBy={filterBy} onFilterBy={onFilterBy} />
      {!id && (
        <EmailList
          emailList={emailList}
          onEmailDelete={onEmailDelete}
          onMarkUnread={onMarkUnread}
          onStarMark={onStarMark}
        />
      )}
      <section className="aside-right"></section>
      <section className="email-index-footer"></section>
      <Outlet />
      {/* add if id put details else regular list */}
    </section>
  );
}

// unread count - check the video of Sharon CR - count unread (three options)
