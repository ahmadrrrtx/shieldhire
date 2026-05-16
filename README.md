# 🛡️ ShieldHire
## Anonymous Resume Verification on Midnight Network

> **"Prove Your Skills. Protect Your Identity."**
> Built for MLH Midnight Hackathon — May 2025

---

## The Problem

Hiring discrimination affects billions:

| Statistic | Source |
|---|---|
| 50% more callbacks for "white-sounding" names | Harvard / Chicago study |
| 30% fewer STEM interviews for women | MIT research |
| 78% of workers 40+ report age discrimination | AARP survey |
| 26% fewer callbacks when disability disclosed | Rutgers study |

**Root cause:** Employers see WHO you are before WHAT you can do.

**Why existing solutions fail:** "Blind hiring" SaaS tools are centralised.
The company still controls the data. There is no cryptographic proof
the process was actually blind.

---

## The Solution

ShieldHire uses Midnight Network's zero-knowledge proof architecture
to create the first **mathematically** anonymous hiring pipeline:
Employer sets requirements → Written to PUBLIC ledger
Candidate submits quals → Kept as ZK witnesses (never on-chain)
qualificationCheck() runs → Inside ZK-SNARK circuit locally
Only result goes on-chain → "Candidate #7392: QUALIFIED"
Personal data exposed → ZERO

---

## Architecture

### Compact Smart Contract (`contract/shieldhire.compact`)
circuit qualificationCheck(
witness candidateYears: Uint32, ← PRIVATE (never revealed)
witness candidateEducation: Uint32, ← PRIVATE (never revealed)
witness candidateSkill: Uint32, ← PRIVATE (never revealed)
minYears: Uint32, ← PUBLIC (from ledger)
minEducation: Uint32, ← PUBLIC (from ledger)
minSkill: Uint32 ← PUBLIC (from ledger)
): Boolean { ... }

ledger {
minYearsRequired: Uint32; ← PUBLIC on-chain
minEducationRequired: Uint32; ← PUBLIC on-chain
minSkillRequired: Uint32; ← PUBLIC on-chain
totalApplications: Counter; ← PUBLIC count only
qualifiedCount: Counter; ← PUBLIC count only
jobActive: Boolean;
}

### TypeScript Layer (`src/contract-layer/`)

- `types.ts` — mirrors all Compact types in TypeScript
- `contract-api.ts` — Midnight SDK integration layer

### UI Layer (`src/ui/`)

- `index.html` — Landing page with stats and how-it-works
- `employer.html` — Job posting portal
- `candidate.html` — Anonymous application portal

---

## Tech Stack

| Technology | Purpose |
|---|---|
| **Midnight Network** | Data protection blockchain |
| **Compact Language** | ZK smart contract (`.compact`) |
| **TypeScript** | Application logic |
| **Vite** | Development server and bundler |
| **ZK-SNARK** | Proof system via Midnight Proof Server |

---

## Running Locally

```bash
git clone https://github.com/your-username/shieldhire
cd ShieldHire
npm install
npm run dev
# Opens http://localhost:5173
