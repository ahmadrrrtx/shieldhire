// ═══════════════════════════════════════════════════════════
//  ShieldHire — Core TypeScript Type Definitions
//  These types mirror the Compact contract structure exactly
// ═══════════════════════════════════════════════════════════

// ─── JOB REQUIREMENTS ──────────────────────────────────────
// These go on the PUBLIC ledger
// Visible to everyone on the blockchain

export interface JobRequirements {
  minYearsExperience: number;  // 0–30
  minEducationLevel: number;   // 1–5 scale (see below)
  minSkillScore: number;       // 1–100
}

// Education level mapping (matches Compact contract comments)
export enum EducationLevel {
  HighSchool = 1,
  Associate  = 2,
  Bachelor   = 3,
  Master     = 4,
  PhD        = 5,
}

export const EducationLabels: Record<number, string> = {
  1: 'High School Diploma',
  2: "Associate's Degree",
  3: "Bachelor's Degree",
  4: "Master's Degree",
  5: 'PhD / Doctorate',
};

// ─── CANDIDATE QUALIFICATIONS ───────────────────────────────
// These are ZK WITNESSES — private inputs
// They NEVER leave the candidate's machine
// They go into the ZK circuit locally

export interface CandidateWitnesses {
  // "secret_" prefix matches our Compact transition parameters
  secret_years:     number;
  secret_education: number;
  secret_skill:     number;
}

// ─── PUBLIC LEDGER STATE ────────────────────────────────────
// What is visible on-chain after contract deployment

export interface LedgerState {
  minYearsRequired:     number;
  minEducationRequired: number;
  minSkillRequired:     number;
  totalApplications:    number;
  qualifiedCount:       number;
  jobActive:            boolean;
}

// ─── APPLICATION RESULT ─────────────────────────────────────
// What the ZK proof returns

export interface ApplicationResult {
  qualified:        boolean;
  proofGenerated:   boolean;
  proofHash:        string;
  transactionHash:  string;
  candidateId:      number;
  timestamp:        string;
  // IMPORTANT: This is always empty — proves no data leaked
  dataExposedToEmployer: string[];
  networkId:        string;
}

// ─── DEPLOYMENT RESULT ──────────────────────────────────────

export interface DeploymentResult {
  contractAddress: string;
  transactionHash: string;
  networkId:       string;
  blockHeight:     number;
  timestamp:       string;
}

// ─── NETWORK CONFIG ─────────────────────────────────────────

export interface MidnightNetworkConfig {
  networkId:      'preprod' | 'mainnet';
  nodeUri:        string;
  proofServerUri: string;
  indexerUri:     string;
}

// Default preprod config (Midnight testnet)
export const PREPROD_CONFIG: MidnightNetworkConfig = {
  networkId:      'preprod',
  nodeUri:        'https://rpc.testnet-02.midnight.network',
  proofServerUri: 'http://localhost:6300',
  indexerUri:     'https://indexer.testnet-02.midnight.network/api/v1/graphql',
};