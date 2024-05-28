document.getElementById("addEmail").addEventListener("click", () => {
  const emailFields = document.getElementById("emailFields");
  const input = document.createElement("input");
  input.type = "email";
  input.name = "email";
  input.required = true;
  emailFields.appendChild(input);
});

document
  .getElementById("emailForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const emails = Array.from(document.getElementsByName("email")).map(
      (input) => input.value
    );
    const subject = document.getElementById("subject").value;
    const text = document.getElementById("text").value;

    const formData = {
      emails,
      subject,
      text,
    };

    try {
      const response = await fetch("/api/v1/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Emails sent successfully!");
        // Reset the form
        document.getElementById("emailForm").reset();

        // Clear all email input fields except the first one
        const emailFields = document.getElementById("emailFields");
        while (emailFields.children.length > 1) {
          emailFields.removeChild(emailFields.lastChild);
        }
      } else {
        alert("Failed to send emails.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while sending emails.");
    }
  });
