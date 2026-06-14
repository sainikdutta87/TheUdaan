/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type City = 'jamshedpur' | 'ranchi';

export type SubCategory =
  | 'disability-pension'
  | 'aadhar-card'
  | 'assisted-devices'
  | 'caste-certificate'
  | 'disability-udid-abha'
  | 'voter-id';

export interface ServiceDefinition {
  id: string;
  name: string;
  status: 'active' | 'upcoming';
  description: string;
  whyItMatters: string;
  howRedWaveAddressesIt: string;
  priceRange?: string;
  milestones?: { title: string; desc: string; date?: string }[];
}

export interface SchemeDetail {
  id: SubCategory;
  title: string;
  overview: string;
  eligibility: string;
  documents: string[];
  pros: string[];
  cons: string[];
  process: {
    jamshedpur: {
      steps: string[];
      additionalInfo?: string;
    };
    ranchi: {
      steps: string[];
      additionalInfo?: string;
    };
  };
  nationalAspect?: {
    title: string;
    description: string;
    keyBenefits: string[];
  };
  stateAspect?: {
    title: string;
    description: string;
    keyBenefits: string[];
  };
}

export interface DecisionQuery {
  age: number;
  disabilityPercentage: number;
  city: City;
  selectedCategory: SubCategory;
  specificIssue: string;
  incomeLevel: 'below-15k' | '15k-30k' | 'above-30k';
}

export interface DecisionAnalysis {
  recommendation: string;
  bestRoute: string;
  pros: string[];
  cons: string[];
  comparisonTable?: {
    criterion: string;
    routeA: string;
    routeB: string;
  }[];
  swot: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
  };
  childFriendlySteps: {
    stepNo: number;
    title: string;
    action: string;
    illustration?: string;
  }[];
  supportingOrganizations: {
    name: string;
    role: string;
    contact?: string;
    city: 'ranchi' | 'jamshedpur' | 'both';
  }[];
}
