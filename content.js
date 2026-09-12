/* ══════════════════════════════════════════════════════════════════════
   CONTENT — everything every design says lives here.

   Sourced from Srinivas_Koushik_Kodukula_Resume.pdf, with dates and
   credential IDs cross-checked against the LinkedIn export and the
   issuers' own verification pages. Nothing is invented.
   ══════════════════════════════════════════════════════════════════════ */
window.SITE = {
  owner: {
    name: 'Srinivas Koushik Kodukula',
    short: 'Srinivas',
    headline: 'Securing software, from the source up.',
    discipline: 'Application Security · Cloud Security',
    intro: 'Cybersecurity master’s candidate at the University of Maryland, working across ' +
           'application security and cloud security. Certified across Azure, Google Cloud, ' +
           'offensive security and application security, with published IEEE research on ' +
           'trust-based attack detection in vehicular networks.',
    status: 'Open to security internships & new-grad roles',
    location: { text: 'College Park, Maryland' },
    email: { text: 'srinivaskoushikkodukula25@gmail.com',
             href: 'mailto:srinivaskoushikkodukula25@gmail.com' },
    phone: { text: '+1 (202) 341-9800', href: 'tel:+12023419800' },
    resume: { text: 'Download PDF', href: 'https://beast2396.github.io/Beast/resume.pdf' },
    github: { text: 'github.com/Beast2396', href: 'https://github.com/Beast2396' },
    linkedin: {
      text: 'srinivas-koushik-kodukula',
      href: 'https://www.linkedin.com/in/srinivas-koushik-kodukula-233884201/'
    }
  },

  capabilities: [
    {
      icon: 'code',
      title: 'Application security',
      body: 'The OWASP Top 10 end to end — SQL injection, XSS, CSRF, SSRF, IDOR, broken ' +
            'authentication and session handling, insecure uploads, and the configuration ' +
            'weaknesses that make them reachable. Web vulnerability testing with Burp Suite.',
      tags: ['OWASP Top 10', 'SQLi · XSS · CSRF', 'Burp Suite', 'Threat modelling']
    },
    {
      icon: 'radar',
      title: 'Offensive & network security',
      body: 'Vulnerability assessment, threat detection and anomaly analysis across networks ' +
            'and applications, plus binary-level work — reversing C programs and Unix ' +
            'binaries with Ghidra and GDB.',
      tags: ['Metasploit', 'Nessus · OpenVAS', 'Wireshark', 'Ghidra · GDB']
    },
    {
      icon: 'cloud',
      title: 'Cloud security',
      body: 'Identity and access governance, network segmentation, TLS and MFA, and secure ' +
            'architecture across Azure, Google Cloud and AWS — including least-privilege ' +
            'IAM and infrastructure automated with CloudFormation.',
      tags: ['Azure', 'Google Cloud', 'AWS IAM · VPC', 'Docker']
    }
  ],

  certifications: [
    { code: 'AZ-500', title: 'Microsoft Certified: Azure Security Engineer Associate',
      issuer: 'Microsoft', meta: 'Verified via Microsoft Learn',
      body: 'Identity and access management, platform protection, security operations, and ' +
            'data and application security across Azure workloads.',
      href: 'https://learn.microsoft.com/api/credentials/share/en-us/SrinivasKoushikKodukula-4548/' +
            '4B3795FE4D5EC7E7?sharingId=C3B1F4CC8D3BB18C' },

    { code: 'PCSE', title: 'Professional Cloud Security Engineer', issuer: 'Google Cloud',
      meta: 'Verified via Credly',
      body: 'Designing and implementing secure infrastructure on Google Cloud: identity and ' +
            'access, network security, data protection, and compliance controls.',
      href: 'https://www.credly.com/badges/587d7d92-cc0b-4b36-80d5-1ecc63cfcdd0/public_url' },

    { code: 'CEH', title: 'Certified Ethical Hacker (CEH v12)', issuer: 'EC-Council',
      meta: 'Issued Aug 2024 · Expires Aug 2027 · Credential ID ECC4831570692',
      body: 'Reconnaissance, scanning, enumeration, system and application exploitation, and ' +
            'post-exploitation across the attack lifecycle.',
      href: null },

    { code: 'CAP', title: 'Certified AppSec Practitioner', issuer: 'The SecOps Group',
      meta: 'Issued Dec 2024 · Credential ID 9410089',
      body: 'Application security fundamentals across the OWASP Top 10 — injection, XSS, XXE, ' +
            'CSRF, SSRF, IDOR, broken authentication and session management, insecure uploads, ' +
            'and TLS and configuration weaknesses.',
      href: null,
      about: 'https://pentestingexams.com/certifications/essentials/certified-application-security-practitioner/' }
  ],

  experience: [
    {
      /* On LinkedIn but not on the résumé. Bullets state only what the
         programme was — no outcomes are claimed that aren't documented. */
      org: 'All India Council for Technical Education (AICTE)',
      meta: 'May 2023 — Jul 2023 · Remote',
      roles: [
        { title: 'Cyber Security (Virtual)', period: 'May — Jul 2023' },
        { title: 'Network Security Associate (Virtual)', period: 'May — Jul 2023' }
      ],
      points: [
        'Completed the Cyber Security virtual internship track.',
        'Completed the Network Security Associate virtual internship track.'
      ]
    },
    {
      org: 'BrainOVision',
      meta: 'Apr 2023 — Jun 2023',
      roles: [{ title: 'Data Science Intern', period: 'Apr — Jun 2023' }],
      points: [
        'Built and evaluated regression models with Python, Pandas, NumPy and Scikit-learn to ' +
        'analyse cost inefficiencies in the food industry.',
        'Compared Random Forest, Support Vector Regression and Decision Tree Regression; ' +
        'Decision Tree Regression reached 98.2% accuracy.'
      ]
    },
    {
      org: 'Salesforce',
      meta: 'Apr 2023 — May 2023',
      roles: [{ title: 'Salesforce Developer / Administrator', period: 'Apr — May 2023' }],
      points: [
        'Developed enterprise applications using Apex and Lightning Web Components, translating ' +
        'business requirements into structured application workflows.',
        'Managed platform data, reporting and access controls, applying data-security and ' +
        'identity/access-management practices to enterprise workflows.'
      ]
    }
  ],

  education: [
    { qualification: 'Master of Engineering, Cybersecurity',
      org: 'University of Maryland, College Park',
      period: 'Jan 2026 — Dec 2027', grade: 'GPA 4.0 / 4.0',
      detail: 'Coursework: Cloud Security, Network Security, Hacking of C Programs and Unix Binaries.' },
    { qualification: 'B.Tech, Computer Science and Engineering',
      org: 'GITAM University, Visakhapatnam',
      period: '2020 — 2024', grade: 'CGPA 8.47 / 10' }
  ],

  projects: [
    {
      title: 'Trust-Based Detection of Malicious Nodes in VANETs',
      tag: 'Published research',
      body: 'A trust-based grey-hole attack detection model using GSR routing, node-behaviour ' +
            'analysis, trust thresholds and dynamic trust assessment across 1 cluster head, ' +
            '50 on-board units and 20 roadside units. Evaluated the security and ' +
            'network-performance trade-off across packet delivery, loss, throughput, delay and ' +
            'routing overhead.',
      metrics: ['92.5% packet delivery', '7.5% packet loss', '819.2 Kbps throughput',
                '0.0075s end-to-end delay'],
      href: null
    },
    {
      title: 'AWS Secure Three-Tier Banking Application & IAM Governance',
      tag: 'Cloud architecture',
      body: 'A secure three-tier AWS banking architecture using public/private subnet ' +
            'segmentation, TLS encryption, MFA, Active Directory and Amazon RDS to address ' +
            'application, identity and data-security risk. Infrastructure automated with ' +
            'CloudFormation, with least-privilege IAM and network isolation designed around ' +
            'PCI DSS requirements.',
      metrics: ['CloudFormation', 'Least-privilege IAM', 'PCI DSS'],
      href: null
    },
    {
      title: 'CompliAI — AI-Driven Legal & Compliance Platform',
      tag: 'Applied AI',
      body: 'A GCP platform integrating the Gemini API to automate extraction and analysis of ' +
            'complex regulatory documents for risk and compliance workflows, with backend ' +
            'validation pipelines that sanitise unstructured LLM output and validate ' +
            'AI-generated results before downstream use.',
      metrics: ['Google Cloud', 'Gemini API', 'Output validation'],
      href: null
    }
  ],

  publications: [
    { title: 'TBNDG — Trust Based Malicious Node Detection for Grey-Hole Attack in VANETs',
      venue: 'IEEE', date: 'May 2025',
      body: 'A trust-based scheme for identifying malicious nodes mounting grey-hole attacks in ' +
            'vehicular ad-hoc networks.',
      href: null }
  ],

  writing: [],

  toolkit: [
    { group: 'Cybersecurity', items: ['Threat detection & analysis', 'Anomaly detection',
      'Vulnerability assessment', 'Threat modelling', 'Risk assessment', 'Cryptography'] },
    { group: 'Web & application', items: ['SQL injection', 'XSS', 'CSRF', 'Burp Suite',
      'Web vulnerability testing'] },
    { group: 'Tools & systems', items: ['Wireshark', 'Metasploit', 'Nessus', 'OpenVAS',
      'Ghidra', 'GDB', 'Bash'] },
    { group: 'Cloud & infrastructure', items: ['GCP', 'AWS (VPC, IAM, RDS, CloudFormation)',
      'Microsoft Azure', 'Docker', 'TLS', 'MFA', 'Network segmentation'] },
    { group: 'Programming', items: ['Python', 'JavaScript', 'SQL', 'Git'] }
  ]
};
