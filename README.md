# 🛡️ ShieldHire
## Anonymous Resume Verification on Midnight Network

> **"Prove Your Skills. Protect Your Identity."**
> Built for MLH Midnight Hackathon — May 2026
=======


## The Problem

Hiring discrimination affects billions of workers worldwide:

| Statistic | Source |
|---|---|
| **50%** more callbacks for resumes with "white-sounding" names | Harvard / Chicago study |
| **30%** fewer STEM interviews for women with identical qualifications | MIT research |
| **78%** of workers over 40 report age discrimination | AARP survey |
| **26%** fewer callbacks when disabilities are disclosed | Rutgers study |

**Root cause:** Employers see WHO you are before WHAT you can do.

**Why existing solutions fail:** "Blind hiring" SaaS tools are centralised.
The company still controls the data. There is no cryptographic proof
the process was actually blind.

---

## The Solution

ShieldHire uses Midnight Network's zero-knowledge proof architecture
to create the first **mathematically** anonymous hiring pipeline:
=======

```
Employer sets requirements  →  Written to PUBLIC ledger
Candidate submits quals     →  Kept as ZK witnesses (never on-chain)
qualificationCheck() runs   →  Inside ZK-SNARK circuit locally
Only result goes on-chain   →  "Candidate #7392: QUALIFIED"
Personal data exposed       →  ZERO
```
<<<<<<< Updated upstream
=======

---

## ✨ V2 Features

### 🎯 Dual Qualification Modes

**Strict Mode** — Traditional AND logic
- Candidate must meet ALL minimum requirements
- Best for: Senior roles, specialized positions

**Weighted Mode** — Flexible scoring system
- Configurable weights for years, education, skills
- Score formula: `(years × W1) + (education × W2) + (skill × W3)`
- Candidate qualifies if weighted score >= threshold
- Best for: Roles where strengths can compensate for gaps

### 🔬 Proof Inspector Panel

Shows judges the technical depth of each ZK proof:
- Circuit name and constraint count
- Proof size in bytes
- Generation time and verification time
- Live syntax-highlighted Compact code
- Explicit witness exposure status (always empty array)

### 🧮 Private Skill Calculator

Self-assessment tool that works like a ZK witness:
- 5 questions with weighted scoring
- All calculations happen 100% in browser
- Questions and answers NEVER leave the device
- Auto-fills the skill score field
- Reinforces the privacy story

### 🎨 ZK Pipeline Visualization

Animated SVG pipeline showing the 5 stages:
1. **Deploy** → `setRequirements()`
2. **Witness** → `secret_*` inputs collected locally
3. **Circuit** → `qualificationCheck()` runs in ZK-SNARK
4. **ZK Proof** → Cryptographic proof generated
5. **On-Chain** → Only result recorded publicly

### 📊 Public Ledger Analytics

Real-time dashboard showing:
- Total anonymous applications counter
- Qualified candidates counter
- Qualification rate
- Personal data points exposed: **always 0**
- Complete ledger state visibility
- Live proof log feed

---

## Architecture

### Compact Smart Contract (`contract/shieldhire.compact`)

```
circuit qualificationCheck(
  witness candidateYears:     Uint32,   ← PRIVATE (never revealed)
  witness candidateEducation: Uint32,   ← PRIVATE (never revealed)
  witness candidateSkill:     Uint32,   ← PRIVATE (never revealed)
  minYears:                   Uint32,   ← PUBLIC (from ledger)
  minEducation:               Uint32,   ← PUBLIC (from ledger)
  minSkill:                   Uint32    ← PUBLIC (from ledger)
=======
The contract defines **3 ZK circuits** and **5 transitions**:

```compact
// ─── ZK CIRCUITS ──────────────────────────────────────────

circuit weightedQualification(
  witness candidateYears:     Uint32,
  witness candidateEducation: Uint32,
  witness candidateSkill:     Uint32,
  yearsWeight: Uint32, educationWeight: Uint32,
  skillWeight: Uint32, threshold: Uint32
>>>>>>> Stashed changes
): Boolean { ... }

circuit strictQualification(
  witness candidateYears:     Uint32,
  witness candidateEducation: Uint32,
  witness candidateSkill:     Uint32,
  minYears: Uint32, minEducation: Uint32, minSkill: Uint32
): Boolean { ... }

circuit selectiveDisclosure(
  witness candidateYears:     Uint32,
  witness candidateEducation: Uint32,
  witness candidateSkill:     Uint32,
  attribute: Uint32, threshold: Uint32
): Boolean { ... }


// ─── PUBLIC LEDGER ────────────────────────────────────────

ledger {
<<<<<<< Updated upstream
  minYearsRequired:     Uint32;    ← PUBLIC on-chain
  minEducationRequired: Uint32;    ← PUBLIC on-chain
  minSkillRequired:     Uint32;    ← PUBLIC on-chain
  totalApplications:    Counter;   ← PUBLIC count only
  qualifiedCount:       Counter;   ← PUBLIC count only
=======
  jobMode:              Uint32;    // 1 = strict, 2 = weighted
  minYearsRequired:     Uint32;
  minEducationRequired: Uint32;
  minSkillRequired:     Uint32;
  yearsWeight:          Uint32;
  educationWeight:      Uint32;
  skillWeight:          Uint32;
  scoreThreshold:       Uint32;
  totalApplications:    Counter;
  qualifiedCount:       Counter;
  selectiveDisclosures: Counter;
>>>>>>> Stashed changes
  jobActive:            Boolean;
}
```


// ─── TRANSITIONS ──────────────────────────────────────────

export transition setStrictRequirements(...): [];
export transition setWeightedRequirements(...): [];
export transition applyAnonymously(...): Boolean;
export transition proveSpecificTrait(...): Boolean;
export transition closeJob(): [];
```

### TypeScript Layer (`src/contract-layer/`)

| File | Purpose |
|---|---|
| `types.ts` | Mirrors all Compact types in TypeScript |
| `contract-api.ts` | Midnight SDK integration layer |

Includes:
- `JobMode` enum (Strict / Weighted)
- `DisclosureAttribute` enum for selective disclosure
- `ProofMetadata` interface for proof inspector
- `WeightedJobRequirements` interface

### UI Layer (`src/ui/`)

<<<<<<< Updated upstream
- `index.html` — Landing page with stats and how-it-works
- `employer.html` — Job posting portal
- `candidate.html` — Anonymous application portal
- `analytics.html` — Public ledger analytics dashboard
=======
| File | Purpose |
|---|---|
| `index.html` | Landing page with pipeline, stats, comparison |
| `employer.html` | Job posting portal with mode selection |
| `candidate.html` | Anonymous application with calculator + inspector |
| `analytics.html` | Public ledger dashboard |
| `enhance.css` | Global styling system |
| `enhance.js` | Animations and interactions |
>>>>>>> Stashed changes

---

## Tech Stack

| Technology | Purpose |
|---|---|
| **Midnight Network** | Data protection blockchain |
| **Compact Language** | ZK smart contract (`.compact`) |
| **TypeScript** | Application logic |
| **Vite** | Development server and bundler |
| **ZK-SNARK** | Proof system via Midnight Proof Server |
| **Netlify** | Production hosting |

---

## How Midnight Features Are Used

| Midnight Feature | How ShieldHire Uses It |
|---|---|
| **Compact Language** | `shieldhire.compact` defines 3 circuits + 5 transitions |
| **Witness Keyword** | `secret_years`, `secret_education`, `secret_skill` stay private |
| **Public Ledger** | Stores job requirements and anonymous counters |
| **Shielded State** | Candidate personal data never leaves their device |
| **ZK-SNARK Proofs** | Generated by `qualificationCheck()` circuit |
| **Counter Type** | Tracks `totalApplications`, `qualifiedCount`, `selectiveDisclosures` |
| **Multiple Circuits** | Strict, weighted, and selective disclosure variants |
| **Transitions** | `setStrictRequirements`, `setWeightedRequirements`, `applyAnonymously`, `proveSpecificTrait`, `closeJob` |
| **Preprod Testnet** | Deployment target for all transactions |

---

## Running Locally

```bash
git clone https://github.com/ahmadrrrtx/shieldhire.git
cd shieldhire
npm install
npm run dev
# Opens http://localhost:5173
```

---

## Full Midnight Deployment (Testnet)

```bash
# 1. Install Compact compiler
npm install -g @midnight-ntwrk/compact-compiler

# 2. Compile the contract
compactc contract/shieldhire.compact src/generated

# 3. Start proof server (requires Docker)
docker run -p 6300:6300 midnightntwrk/proof-server:latest

# 4. Get tDUSK tokens
# Visit: https://faucet.preprod.midnight.network

# 5. Connect Lace Wallet and deploy
npm run start
```

<<<<<<< Updated upstream
=======
See `DEPLOY.md` for detailed deployment instructions.

---

## Demo Flow

<<<<<<< Updated upstream
1. **Home page** — shows discrimination stats and explains ZK proofs
2. **Employer Portal** — post a job, deploy requirements to Midnight
3. **Candidate Portal** — submit qualifications as ZK witnesses
4. **Analytics Page** — view anonymous public ledger statistics
5. **Result** — Qualified or Not Qualified, with zero personal data exposed

---

## How Midnight Features Are Used

| Midnight Feature | How ShieldHire Uses It |
|---|---|
| **Compact Language** | `shieldhire.compact` defines the ZK circuit and ledger |
| **Witness Keyword** | `secret_years`, `secret_education`, `secret_skill` stay private |
| **Public Ledger** | Stores job requirements and anonymous counts |
| **Shielded State** | Candidate personal data never leaves their device |
| **ZK-SNARK Proofs** | Generated by `qualificationCheck()` circuit |
| **Counter Type** | Tracks `totalApplications` and `qualifiedCount` |
| **Transitions** | `setRequirements()`, `applyAnonymously()`, `closeJob()` |
| **Preprod Testnet** | Deployment target for all transactions |

---

## Note on Demo vs Production

This hackathon submission demonstrates the **correct Midnight
architecture**:

- ✅ Real Compact contract with correct `witness` syntax
- ✅ Correct dual ledger pattern (public requirements, private witnesses)
- ✅ TypeScript codebase (Midnight requirement)
- ✅ Correct Midnight SDK package references
=======
### As an Employer:
1. Go to **Employer Portal**
2. Choose **Qualification Mode** (Strict or Weighted)
3. Fill in job requirements
4. If Weighted: configure weights and threshold
5. Click **Deploy to Midnight Network**
6. Contract deployed → requirements on public ledger

### As a Candidate:
1. Go to **Candidate Portal**
2. See job requirements at top
3. (Optional) Use the **Private Skill Calculator** for self-assessment
4. Fill in qualifications (these are ZK witnesses)
5. Click **Generate ZK Proof & Apply**
6. Watch the 5-stage ZK pipeline animate
7. See result + Proof Inspector with full technical details
8. Confirm: **Data exposed to employer = []**

### Public Verification:
1. Go to **Analytics Page**
2. See aggregate counts on the public ledger
3. See list of all shielded data points (never exposed)
4. View latest ZK proof log

---

## Demo vs Production Note

This hackathon submission demonstrates the **correct Midnight
architecture** with full UI/UX:

- ✅ Real Compact contract (3 circuits, 5 transitions, verified syntax)
- ✅ Correct dual ledger pattern (public ledger + private witnesses)
- ✅ TypeScript codebase (Midnight requirement)
- ✅ Correct Midnight SDK package references
- ✅ Proof Inspector showing realistic metrics
>>>>>>> Stashed changes
- ⚠️ Frontend uses simulated proof server calls
  (full deployment requires Docker + Lace Wallet setup)

---

## Tracks Submitted

- 🏆 **Best Use of Midnight Network** — Core use of dual ledger and ZK proofs
- 🏆 **Best Beginner Hack** — First-time Midnight builder
=======
## Roadmap (Phase 2 Features)

The following advanced Midnight features are planned for the
post-hackathon production version:

### Smart Contract Evolution
- **Multi-job factory pattern** — One contract spawns per-job instances
- **Credential hashing** — Range proofs to prove qualifications without revealing exact values
- **Merkle tree membership** — Batch verification of qualified candidate pools
- **Access control** — Only deploying employer can modify or close jobs

### Privacy Enhancements
- **Shielded application fees** — Anonymous tDUSK payments for premium positions
- **DID integration** — Decentralized identity for verified credentials
- **Revocable credentials** — Allow candidates to revoke past anonymous applications

### Infrastructure
- **Full proof server integration** — Replace simulation with live ZK-SNARK generation
- **Multi-employer support** — Job board with persistent ledger storage
- **On-chain job lifecycle** — Open → Accepting → Closed → Results states
- **Anonymous ranking** — Top N candidates without identity revelation

### Developer Experience
- **Comprehensive test suite** — Compact contract tests + TypeScript unit tests
- **Compiled contract artifacts** — Pre-built circuits for faster deployment
- **CI/CD pipeline** — Automated testing and Netlify deployment

### Integrations
- **LinkedIn verified credentials** — Pull verified work history as ZK witnesses
- **University API integration** — Verify degrees without revealing institution
- **HR platform partnerships** — Make anonymous hiring the default for partners

---

## Tracks Submitted

- 🏆 **Best Use of Midnight Network** — Core use of dual ledger and ZK proofs
- 🏆 **Best Beginner Hack** — First-time Midnight builders
- 🏆 **Social Impact** — Solving real-world hiring discrimination

---

## Team

| Member | Role | Contact | GitHub |
|---|---|---|---|
| **Ahmad** | Lead Builder, Smart Contract Developer, Product Strategist | ahmadrrrtx333@gmail.com | [@ahmadrrrtx](https://github.com/ahmadrrrtx) |
| **Diya Majee** | Co-Builder, Research Lead, UI/UX Designer | diyamajee0391@gmail.com | [@diyamajee-spec](https://github.com/diyamajee-spec) |

## License

MIT — Built with ❤️ for MLH Midnight Hackathon 2026
=======
---

## License

MIT — Built with ❤️ for Midnight Hackathon 2026

---

## Acknowledgments

- [Midnight Network](https://midnight.network) — for building the future of data protection
- [MLH](https://mlh.io) — for hosting amazing hackathons
- All researchers who documented hiring discrimination data

=======
- The Compact language team for excellent documentation

---

**ShieldHire**: Prove your skills. Protect your identity. Fair hiring, mathematically guaranteed. 🌙🛡️
>>>>>>> Stashed changes
