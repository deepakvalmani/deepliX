/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type PageType = 'home' | 'services' | 'about' | 'contact' | 'admin' | 'terms' | 'privacy' | 'security';

export interface ServiceDetail {
  id: string;
  title: string;
  iconName: string;
  shortDesc: string;
  description: string;
  businessValue: string;
  specs: string[];
  techStack: string[];
}

export interface InboundInquiry {
  id: string;
  name: string;
  email: string;
  company: string;
  title: string;
  bottlenecks: string[];
  message: string;
  scale: 'startup' | 'mid-market' | 'enterprise';
  createdAt: string;
  status: 'pending_review' | 'scheduled' | 'assigned';
  referenceId: string;
}

export interface BlueprintCategory {
  id: string;
  label: string;
  description: string;
  bottleneck: string;
  solutionTitle: string;
  solutionDesc: string;
  nodes: {
    sources: string[];
    transports: string[];
    processors: string[];
    targets: string[];
  };
  sampleCode: string;
  codeLanguage: string;
}
