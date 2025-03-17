
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';

const faqItems = [
  {
    question: "What is Farmly.ng?",
    answer: "Farmly.ng is an agricultural investment platform that allows individuals to invest in farm projects and earn fixed annual returns."
  },
  {
    question: "How does Farmly.ng generate revenue?",
    answer: "Farmly.ng generates revenue by selling harvested crops. Investors' returns are funded from these proceeds, and the only deduction from payouts is the withholding tax on profits."
  },
  {
    question: "How do I invest?",
    answer: "You can invest by signing up, selecting an investment plan, and making a payment via bank transfer or debit card."
  },
  {
    question: "What are the available investment plans?",
    answer: "Short-Term: 36% per annum. Medium-Term (2 years): 36% per annum + 10% exit bonus. Long-Term (3+ years): 25% per annum for years 1-3, then 50% per annum."
  },
  {
    question: "When can I withdraw my earnings?",
    answer: "You can request payouts at the end of each month based on cumulative interest."
  },
  {
    question: "Can I exit my investment before the term ends?",
    answer: "No, investments are locked until the end of the contract term."
  },
  {
    question: "How secure is my investment?",
    answer: "Farmly.ng employs SSL/TLS encryption and follows industry best practices to protect investor data and transactions."
  },
  {
    question: "Do I need to submit my ID to invest?",
    answer: "No, ID submission is not required for investors."
  },
  {
    question: "Is there a referral program?",
    answer: "Yes! You earn a 5% bonus for every new investor you refer."
  },
  {
    question: "What are the tax implications of my earnings?",
    answer: "Withholding tax (WHT) is deducted from your profits as required by Nigerian regulations. No additional tax reporting is required for now."
  },
  {
    question: "What happens if Farmly.ng does not reach its investment target?",
    answer: "We allocate funds to available farm projects based on demand. If an investment round is not fully funded, we may roll it into the next cycle or refund investors."
  },
  {
    question: "What happens if a farm experiences losses?",
    answer: "Farmly.ng ensures risk mitigation through insurance coverage and expert farm management. Investors' returns remain fixed as per the investment plan."
  },
  {
    question: "Can I reinvest my earnings?",
    answer: "Yes, you can choose to reinvest your earnings, but there are no additional incentives for reinvestment."
  },
  {
    question: "How does the referral bonus work?",
    answer: "When you refer a new investor, you earn a 5% bonus based on their initial investment. The bonus is credited to your account."
  },
  {
    question: "How do I track my investments and earnings?",
    answer: "You can log in to your investor dashboard to view your active investments, earnings, and payout history."
  },
  {
    question: "Can I invest more than once?",
    answer: "Yes, you can make multiple investments in different plans or reinvest your payouts into new plans."
  },
  {
    question: "Is my capital guaranteed?",
    answer: "Farmly.ng invests in real agricultural projects, which carry inherent risks. However, we mitigate risks through insurance coverage and expert farm management."
  },
  {
    question: "How will I receive my payouts?",
    answer: "Payouts are processed through bank transfers to the account details provided during registration."
  },
  {
    question: "Can I change my investment plan after investing?",
    answer: "No, once you select a plan and invest, the terms remain fixed until the end of the investment period."
  },
  {
    question: "How do I contact customer support?",
    answer: "You can reach our support team via email, phone, or our in-app messaging feature during business hours."
  }
];

const FAQ = () => {
  return (
    <section id="faq" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-muted-foreground text-lg">
            Find answers to common questions about investing with Farmly.ng
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-medium text-lg">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
