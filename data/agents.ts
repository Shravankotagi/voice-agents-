import { Agent } from "@/types";

export const agents: Agent[] = [
  {
    id: "aarya",

    industry: "bfsi",

    name: "AARYA",

    role: "Fraud Resolution AI",

    color: "#38bdf8",

    currentStatus: "Verifying suspicious transaction",

    description:
      "Handles fraud escalation, transaction disputes, and KYC verification workflows.",

    workflowTags: [
      "Fraud Escalation",
      "KYC Verification",
      "Transaction Disputes",
    ],

    capabilities: [
      "Fraud detection",
      "Account verification",
      "Dispute handling",
    ],

    useCases: [
      "Card blocking",
      "Transaction disputes",
      "KYC workflows",
    ],

    channels: ["Voice", "WhatsApp"],

    status: "live",

    metric: "97.2% resolution accuracy",

    latency: "1.4s",

    accuracy: "97.2%",

    callsToday: "14,820",

    retellAgentId:
      process.env.NEXT_PUBLIC_RETELL_AARYA_ID || "",

    demoTranscript: [
      {
        role: "user",
        text:
          "My card transaction was declined yesterday.",
      },
      {
        role: "agent",
        text:
          "I found the flagged transaction and verified your recent account activity. I've safely re-enabled the card and removed the merchant restriction.",
      },
    ],
  },

  {
    id: "kavach",

    industry: "bfsi",

    name: "KAVACH",

    role: "Insurance Claims AI",

    color: "#0ea5e9",

    currentStatus: "Assigning field surveyor",

    description:
      "Processes insurance claims, renewals, and policy verification requests.",

    workflowTags: [
      "Claim Registration",
      "Survey Scheduling",
      "Policy Verification",
    ],

    capabilities: [
      "Claims processing",
      "Policy renewal",
      "Survey coordination",
    ],

    useCases: [
      "Motor claims",
      "Health insurance claims",
      "Policy renewals",
    ],

    channels: ["Voice", "WhatsApp", "Email"],

    status: "live",

    metric: "48hr average claim resolution",

    latency: "1.7s",

    accuracy: "96.8%",

    callsToday: "8,340",

    retellAgentId:
      process.env.NEXT_PUBLIC_RETELL_KAVACH_ID || "",

    demoTranscript: [
      {
        role: "user",
        text:
          "I met with an accident this morning and need to file a claim.",
      },
      {
        role: "agent",
        text:
          "I've created your claim request and assigned a surveyor near your location for tomorrow at 10 AM. You'll receive a WhatsApp link to upload vehicle photos shortly.",
      },
    ],
  },

  {
    id: "aayu",

    industry: "healthtech",

    name: "AAYU",

    role: "Clinical Triage AI",

    color: "#14b8a6",

    currentStatus: "Scheduling same-day consultation",

    description:
      "Handles patient triage, appointment scheduling, and pre-consultation intake.",

    workflowTags: [
      "Symptom Triage",
      "Appointment Scheduling",
      "Patient Intake",
    ],

    capabilities: [
      "Symptom collection",
      "Doctor scheduling",
      "Clinical intake",
    ],

    useCases: [
      "Urgent appointments",
      "Follow-up scheduling",
      "Patient screening",
    ],

    channels: ["Voice", "Chat"],

    status: "live",

    metric: "92% triage accuracy",
                                                                           
    latency: "1.9s",

    accuracy: "95.4%",

    callsToday: "6,210",

    retellAgentId:
      process.env.NEXT_PUBLIC_RETELL_AAYU_ID || "",

    demoTranscript: [
      {
        role: "user",
        text:
          "I've had a fever for two days and difficulty swallowing.",
      },
      {
        role: "agent",
        text:
          "Based on your symptoms, I've scheduled a same-day consultation at 3:30 PM with Dr. Mehra. Please avoid solid food two hours before the appointment.",
      },
    ],
  },

  {
    id: "nova",

    industry: "ecommerce",

    name: "NOVA",

    role: "Customer Support AI",

    color: "#fb923c",

    currentStatus: "Handling delayed delivery escalation",

    description:
      "Resolves delivery issues, refund escalations, and return requests automatically.",

    workflowTags: [
      "Refund Escalation",
      "Return Authorization",
      "Delivery Support",
    ],

    capabilities: [
      "Order tracking",
      "Refund processing",
      "Return management",
    ],

    useCases: [
      "Delayed delivery",
      "Refund escalation",
      "Order cancellation",
    ],

    channels: ["Voice", "Chat", "WhatsApp"],

    status: "live",

    metric: "94% first-contact resolution",

    latency: "2.1s",

    accuracy: "94.9%",

    callsToday: "22,150",

    retellAgentId:
      process.env.NEXT_PUBLIC_RETELL_NOVA_ID || "",

    demoTranscript: [
      {
        role: "user",
        text:
          "My order was supposed to arrive three days ago and I still have nothing.",
      },
      {
        role: "agent",
        text:
          "I found your order delayed at the Pune sorting hub. I've initiated a priority trace and applied a ₹150 compensation coupon to your account.",
      },
    ],
  },

  {
    id: "neev",

    industry: "edtech",

    name: "NEEV",

    role: "Enrollment & Counseling AI",

    color: "#8b5cf6",

    currentStatus: "Qualifying new student lead",

    description:
      "Handles student onboarding, counseling workflows, and enrollment follow-ups.",

    workflowTags: [
      "Lead Qualification",
      "Counseling",
      "Enrollment Follow-up",
    ],

    capabilities: [
      "Course recommendation",
      "Lead nurturing",
      "Admission guidance",
    ],

    useCases: [
      "Student onboarding",
      "Counseling scheduling",
      "Fee reminders",
    ],

    channels: ["Voice", "WhatsApp", "Email"],

    status: "live",

    metric: "38% higher enrollment conversion",

    latency: "1.6s",

    accuracy: "95.8%",

    callsToday: "4,890",

    retellAgentId:
      process.env.NEXT_PUBLIC_RETELL_NEEV_ID || "",

    demoTranscript: [
      {
        role: "user",
        text:
          "I'm interested in your Data Science program but unsure if it's beginner-friendly.",
      },
      {
        role: "agent",
        text:
          "The program starts from foundational concepts and includes mentorship support. I've also scheduled a counseling session tomorrow at 5 PM to help you choose the right track.",
      },
    ],
  },

  {
    id: "tara",

    industry: "hospitality",

    name: "TARA",

    role: "Guest Concierge AI",

    color: "#ec4899",

    currentStatus: "Managing room upgrade request",

    description:
      "Handles reservations, concierge requests, and multilingual guest assistance.",

    workflowTags: [
      "Reservation Management",
      "Guest Support",
      "Room Upgrades",
    ],

    capabilities: [
      "Booking management",
      "Concierge assistance",
      "Guest communication",
    ],

    useCases: [
      "Reservation changes",
      "Room upgrades",
      "Travel assistance",
    ],

    channels: ["Voice", "WhatsApp"],

    status: "live",

    metric: "96% guest satisfaction",

    latency: "1.5s",

    accuracy: "96.3%",

    callsToday: "3,720",

    retellAgentId:
      process.env.NEXT_PUBLIC_RETELL_TARA_ID || "",

    demoTranscript: [
      {
        role: "user",
        text:
          "I'd like to move my booking from Saturday to Sunday evening.",
      },
      {
        role: "agent",
        text:
          "I've updated your reservation to Sunday evening and upgraded your room to a sea-view suite at no additional charge.",
      },
    ],
  },
];
