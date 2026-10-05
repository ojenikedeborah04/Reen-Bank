// Hassle-free banking page interactions.
const faqs = [
  {
    question: "How do I sign up for an account with Reen Bank?",
    answer:
      "Click Get Started, enter your details, and complete the email verification demo to explore your dashboard.",
  },
  {
    question: "What types of accounts does Reen Bank offer?",
    answer:
      "Reen Bank offers a variety of accounts to suit your financial needs, including savings accounts, checking accounts, and credit cards. We also offer loans, investment services, and other financial products.",
  },
  {
    question: "Is Reen Bank FDIC insured?",
    answer:
      "Yes, Reen Bank is FDIC insured which means that your deposits are insured up to $250,000 per depositor, per insured bank, for each account ownership category.",
  },
  {
    question: "How can I access my Reen Bank account online?",
    answer:
      "You can access your Reen Bank account online by logging into our secure online banking platform using your username and password. From there you can view your account balances, transfer funds, pay bills and more. ",
  },
  {
    question:
      "What security measures does Reen Bank have in place to protect my financial information?",
    answer:
      "Reen Bank takes the security of your financial information seriously and has a number of measures in place to protect against unauthorized access and fraud. These measures include encryption, two-factor authentication, and regular security updates and monitoring.",
  },
];
function showFaq(selected) {
  document.getElementById("faq-title").textContent = faqs[selected].question;
  document.getElementById("faq-answer").textContent = faqs[selected].answer;
  const list = document.getElementById("faq-list");
  list.replaceChildren();
  faqs.forEach((faq, index) => {
    if (index === selected) return;
    const button = document.createElement("button");
    button.className =
      "flex justify-between gap-6 text-left text-lg font-semibold text-[#4c2879] underline underline-offset-4";
    button.textContent = faq.question + "   →";
    button.addEventListener("click", () => showFaq(index));
    list.append(button);
  });
}
showFaq(0);
document.getElementById("newsletter").addEventListener("submit", (event) => {
  event.preventDefault();
  sessionStorage.setItem(
    "prefillEmail",
    document.getElementById("start-email").value,
  );
  location.href = "register.html";
});
