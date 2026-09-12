/* ══════════════════════════════════════════════════════════════════════
   CONTENT — everything the site says lives here.

   Facts below come from the LinkedIn profile export unless marked.
   Entries with  todo: true  render an amber "Needs your input" chip and
   are excluded from confirmed counts. Nothing here claims anything you
   haven't supplied.
   ══════════════════════════════════════════════════════════════════════ */
window.SITE = {
  owner: {
    name: 'Srinivas Koushik Kodukula',
    short: 'Srinivas',
    headline: 'Securing software, from the source up.',
    discipline: 'Application Security · Cloud Security',
    intro: 'Cybersecurity master’s candidate at the University of Maryland, working across ' +
           'application security and cloud security. Certified AppSec Practitioner and Certified ' +
           'Ethical Hacker, with published IEEE research on trust-based attack detection in ' +
           'vehicular networks.',
    status: 'Open to security internships & new-grad roles',
    location: { text: 'United States' },
    email: { text: 'srinivaskoushikkodukula25@gmail.com',
             href: 'mailto:srinivaskoushikkodukula25@gmail.com' },
    resume: { text: 'Résumé PDF', href: null, todo: true },
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
      body: 'The OWASP Top 10 end to end — injection, XSS, XXE, CSRF, SSRF, IDOR, broken ' +
            'authentication and session handling, insecure uploads, and the configuration ' +
            'weaknesses that make them reachable.',
      tags: ['OWASP Top 10', 'Source review', 'Web & API testing', 'Burp Suite']
    },
    {
      icon: 'radar',
      title: 'Offensive security',
      body: 'Reconnaissance through to post-exploitation: enumeration, service and network ' +
            'attack paths, privilege escalation, and writing up findings so they get fixed.',
      tags: ['Recon', 'Enumeration', 'Exploitation', 'Reporting']
    },
    {
      icon: 'cloud',
      title: 'Cloud security',
      body: 'Identity and access, network segmentation, key and secret management, and posture ' +
            'assessment across Azure and Google Cloud environments.',
      tags: ['Azure', 'Google Cloud', 'IAM', 'Posture']
    }
  ],

  certifications: [
    { code: 'CAP', title: 'Certified AppSec Practitioner', issuer: 'The SecOps Group',
      meta: 'Issued Dec 2024 · Credential ID 9410089',
      body: 'Application security fundamentals across the OWASP Top 10 — injection, XSS, XXE, CSRF, ' +
            'SSRF, IDOR, broken authentication and session management, insecure uploads, and TLS ' +
            'and configuration weaknesses.',
      href: null,
      about: 'https://pentestingexams.com/certifications/essentials/certified-application-security-practitioner/' },

    { code: 'CEH', title: 'Certified Ethical Hacker', issuer: 'EC-Council',
      meta: 'Issued Aug 2024 · Expires Aug 2027 · Credential ID ECC4831570692',
      body: 'Reconnaissance, scanning, enumeration, system and application exploitation, and ' +
            'post-exploitation across the attack lifecycle.',
      href: null },

    { code: 'AZ-500', title: 'Microsoft Certified: Azure Security Engineer Associate',
      issuer: 'Microsoft',
      meta: 'Verified via Microsoft Learn',
      body: 'Identity and access, platform protection, security operations, and data and ' +
            'application security on Azure.',
      href: 'https://learn.microsoft.com/api/credentials/share/en-us/SrinivasKoushikKodukula-4548/' +
            '4B3795FE4D5EC7E7?sharingId=C3B1F4CC8D3BB18C' },

    { code: 'PCSE', title: 'Professional Cloud Security Engineer', issuer: 'Google Cloud',
      meta: 'Verified via Credly',
      body: 'Designing and implementing secure infrastructure on Google Cloud, from IAM to ' +
            'data protection and compliance.',
      href: 'https://www.credly.com/badges/587d7d92-cc0b-4b36-80d5-1ecc63cfcdd0/public_url' }
  ],

  experience: [
    {
      org: 'All India Council for Technical Education (AICTE)',
      meta: 'Internship · Remote · 3 mos',
      roles: [
        { title: 'Cyber Security (Virtual)', period: 'May 2023 — Jul 2023' },
        { title: 'Network Security Associate (Virtual)', period: 'May 2023 — Jul 2023' }
      ],
      needDetail: true
    },
    {
      org: 'BrainOvision Solutions India',
      meta: 'Internship · Hyderabad, India · Remote · 2 mos',
      roles: [{ title: 'Data Science', period: 'May 2023 — Jun 2023' }],
      needDetail: true
    },
    {
      org: 'SmartInternz',
      meta: 'Internship · Hyderabad, India · Remote · 2 mos',
      roles: [
        { title: 'Salesforce Developer', period: 'Apr 2023 — May 2023' },
        { title: 'Salesforce Administrator', period: 'Apr 2023 — May 2023' }
      ],
      needDetail: true
    }
  ],

  education: [
    { qualification: 'Master of Engineering, Cybersecurity',
      org: 'University of Maryland — A. James Clark School of Engineering',
      period: 'Jan 2026 — Present', grade: 'CGPA 4.0 / 4.0' },
    { qualification: 'B.Tech, Computer Science',
      org: 'GITAM Deemed University, Visakhapatnam',
      period: '2020 — 2024', grade: 'CGPA 8.47 / 10' }
  ],

  publications: [
    { title: 'TBNDG — Trust Based Malicious Node Detection for Grey-Hole Attack in VANETs',
      venue: 'IEEE', date: 'May 2025',
      body: 'A trust-based scheme for identifying malicious nodes mounting grey-hole attacks in ' +
            'vehicular ad-hoc networks.',
      href: null }
  ],

  writing: [
    { title: 'Your first post', blurb: 'A short line on what the reader takes away.',
      date: 'Draft', tag: 'AppSec', href: null, todo: true },
    { title: 'Your second post', blurb: 'Writeups, lab notes, or a vulnerability class explained well.',
      date: 'Draft', tag: 'Offensive', href: null, todo: true },
    { title: 'Your third post', blurb: 'Keep one slot for something opinionated.',
      date: 'Draft', tag: 'Cloud', href: null, todo: true }
  ],

  toolkit: [
    { group: 'Application security', items: ['OWASP Top 10', 'Burp Suite', 'SAST / DAST', 'API testing'] },
    { group: 'Offensive security', items: ['Nmap', 'Metasploit', 'Enumeration', 'Privilege escalation'] },
    { group: 'Cloud', items: ['Microsoft Azure', 'Google Cloud', 'IAM', 'Salesforce'] },
    { group: 'Engineering', items: ['Python', 'Java', 'SQL', 'Git', 'Linux'] }
  ]
};
