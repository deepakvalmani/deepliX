/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ServiceDetail, BlueprintCategory } from '../types';

export const SERVICES_LIST: ServiceDetail[] = [
  {
    id: 'data-engineering',
    title: 'Data Ingestion & Pipelines',
    iconName: 'Database',
    shortDesc: 'We move and organize your business info in one clean place.',
    description: 'We build simple, fast pipelines that collect and organize your business data. We move it safely into a single database so your team always sees correct and updated reports with no delay.',
    businessValue: 'This helps you see how your business is doing instantly without waiting on manual Excel spreadsheets.',
    specs: [
      'Automatic copying of data between separate systems',
      'Combining multiple files and spreadsheets into one place',
      'Instant checks to find wrong or missing numbers',
      'Clean staging so you can search and read your data with zero lag'
    ],
    techStack: ['PostgreSQL', 'Snowflake', 'dbt', 'Apache Kafka', 'Airflow', 'AWS Redshift']
  },
  {
    id: 'workflow-automation',
    title: 'Easy Work Automation',
    iconName: 'Cpu',
    shortDesc: 'We connect your software apps so they share info automatically.',
    description: 'Stop copy-pasting customer details from one side to another. We connect your daily business systems (like invoicing, sales CRM, and custom registers) so data flows on its own without errors.',
    businessValue: 'This saves your team hours of boring manual input and prevents costly data entry mistakes.',
    specs: [
      'Trigger actions direct when a client pays a Stripe invoice',
      'Connect sales pages to your financial ledger instantly',
      'Simple, automatic email and chat alerts for your team',
      'Automatic retry steps so work never fails even if a network drops'
    ],
    techStack: ['TypeScript', 'Node.js', 'Redis', 'RabbitMQ', 'Stripe API', 'Salesforce Core']
  },
  {
    id: 'internal-systems',
    title: 'Custom Admin Dashboards',
    iconName: 'LayoutGrid',
    shortDesc: 'Simple screens built specifically for your employees.',
    description: 'Throw away confusing spreadsheets and clunky internal software. We build simple, neat dashboards that let your operations team click, search, edit databases, and manage company resources safely.',
    businessValue: 'Brings all your business tools into one easy screen, protecting your core data from manual typing mistakes.',
    specs: [
      'Clean, fast web pages that load in a blink',
      'Simple logins with custom access permissions',
      'Easy input forms connected directly to your database',
      'Clear, interactive charts that update in real time',
      'A simple activity log showing who updated what'
    ],
    techStack: ['React', 'D3.js', 'Tailwind CSS', 'Vite', 'Node.js', 'PostgreSQL']
  },
  {
    id: 'cognitive-ai',
    title: 'Smart AI & Search Assistants',
    iconName: 'BrainCircuit',
    shortDesc: 'Search assistants that read your manuals and answer questions.',
    description: 'We help you put simple, secure AI in your company. We build smart search boxes that read your internal PDFs, manuals, and customer files so your workers can get any answer in plain English instantly.',
    businessValue: 'Saves hours of reading through old folders and emails by giving you the correct answers right away.',
    specs: [
      'Safe AI search that only reads content you approve',
      'A helpful question-and-answer box inside your daily chat',
      'Strict safety blocks to hide private files and cards',
      'Built using direct web calls to secure Gemini models'
    ],
    techStack: ['Google GenAI SDK (Gemini)', 'Pinecone', 'pgvector', 'Python', 'LlamaIndex']
  },
  {
    id: 'system-integration',
    title: 'Full System Connection',
    iconName: 'Network',
    shortDesc: 'We bridge your new and old software so they run in perfect harmony.',
    description: 'We bridge your standalone apps, cloud folders, and older database setups into one clean web setup. This makes sure all systems are updated instantly, completely stopping double bookings or lost records.',
    businessValue: 'Closes communication gaps between separate software tools so your business runs smoothly.',
    specs: [
      'Simple web gateways to bridge separate software tools',
      'Quick import adapters for old databases and spreadsheets',
      'Live synchronizers that match files instantly',
      'Email warning alerts if a system disconnects'
    ],
    techStack: ['Express', 'Docker', 'gRPC', 'PostgreSQL', 'Redis', 'Vite']
  }
];

export const BLUEPRINT_CATEGORIES: BlueprintCategory[] = [
  {
    id: 'database-cdc',
    label: 'Real-time Data Pipeline',
    description: 'Connecting separate databases into one clean data warehouse so your numbers update instantly.',
    bottleneck: 'Manual Excel files that are slow, making business reports delayed and wrong.',
    solutionTitle: 'Fast Data Synchronizer',
    solutionDesc: 'We check and copy row changes every 5 minutes. This updates your charts instantly so you make decisions on fresh info.',
    nodes: {
      sources: ['Production DB', 'Stripe Payments', 'Salesforce pipeline'],
      transports: ['Fast Ingestion Feed', 'Secure Data Stream'],
      processors: ['Data Schema Cleaner', 'Format Validator'],
      targets: ['Data Warehouse stages', 'Staff KPI Dashboard']
    },
    sampleCode: `SELECT 
  event_time, 
  metric_name, 
  count(id) AS current_total
FROM data_stream_buffer
WHERE event_time >= NOW() - INTERVAL '5 minutes'
AND is_validated = true;`,
    codeLanguage: 'sql'
  },
  {
    id: 'automated-ops',
    label: 'Automatic Booking & Billing Tasks',
    description: 'Simple triggers connecting billing flags, account generations, and client welcoming messages.',
    bottleneck: 'Lost customers when billing systems crash or key software setups take days to do manually.',
    solutionTitle: 'Reliable Task Scheduler',
    solutionDesc: 'A stable task runner that automatically registers accounts, delivers license codes, and retries if the internet drops.',
    nodes: {
      sources: ['Stripe payment alert', 'Custom sales page', 'Sign-up form'],
      transports: ['Redis memory list', 'Main task routing scheduler'],
      processors: ['Account Provision Code', 'Billing validation checker'],
      targets: ['Private User database', 'Email invoice sender', 'Customer onboarding portal']
    },
    sampleCode: `export async function handlePaidBill(paymentEvent: any) {
  const meta = paymentEvent.data;
  const lockKey = \`billing:task:\${meta.userId}\`;
  
  await redis.set(lockKey, "processing", "EX", 120);
  const queueToken = await mainQueue.add({
    userId: meta.userId,
    userTier: meta.tier,
    timestamp: Date.now()
  });
  return { job_id: queueToken.id };
}`,
    codeLanguage: 'typescript'
  },
  {
    id: 'cognitive-rag',
    label: 'Smart AI Document Search',
    description: 'A helpful AI search assistant built direct on top of your standard office files, guides, and manuals.',
    bottleneck: 'Employees wasting 40% of their workday looking through old computer folders and paper guides.',
    solutionTitle: 'Smart Document Assistant',
    solutionDesc: 'We read your text files and let employees ask natural questions to get correct, summarized answers in plain English instantly.',
    nodes: {
      sources: ['Company help manuals', 'Older support records', 'Office guidebooks'],
      transports: ['File reader and cleaner', 'Text vector generator'],
      processors: ['AI vector analyzer', 'Gemini Context prompt builder'],
      targets: ['Secure Vector database', 'Customer Help chatbot window']
    },
    sampleCode: `import { GoogleGenAI } from "@google/genai";
const ai = new GoogleGenAI();

async function answerSupportInquiry(rawInquiry: string, vectorChunks: string[]) {
  const contextText = vectorChunks.join("\\n--- NEXT REFERENCE ---\\n");
  const modelSpec = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: [
      { text: \`You are a helpful office assistant. Answer using ONLY this text: \${contextText}\\nQuestion: \${rawInquiry}\` }
    ],
    config: { temperature: 0.1 }
  });
  return modelSpec.text;
}`,
    codeLanguage: 'typescript'
  },
  {
    id: 'ops-dashboard',
    label: 'Unified Controls Dashboard',
    description: 'One secure web page combining system stats, billing states, and rapid employee actions.',
    bottleneck: 'Staff needing 4 separate browser tabs and complex codes to run a simple customer billing edit.',
    solutionTitle: 'Simple Admin Portal',
    solutionDesc: 'A secure admin portal with clean search fields, direct database change forms, and easy visual diagrams.',
    nodes: {
      sources: ['Database tables', 'User logs lists', 'Server status checks'],
      transports: ['Web browser socket', 'API bridge dispatcher'],
      processors: ['Staff activity audit writer', 'Action safe warning filter'],
      targets: ['Staff unified admin portal', 'Database security report']
    },
    sampleCode: `export function AdminVerificationWrapper({ activeAction, onApprove }) {
  const [safetyCleared, setSafetyCleared] = useState(false);
  return (
    <div className="border border-red-900 bg-red-950/20 p-4 rounded-md">
      <h4 className="text-white font-mono text-sm">Do you want to write these changes?</h4>
      <p className="text-gray-400 text-xs mt-1">This will edit production files directly.</p>
      <button onClick={() => { onApprove(); }} className="mt-3 px-3 py-1 bg-red-600 rounded text-xs text-white">
        Yes, do this update
      </button>
    </div>
  );
}`,
    codeLanguage: 'javascript'
  }
];
