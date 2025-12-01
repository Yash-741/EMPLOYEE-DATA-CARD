// Type definitions for Employee Data Card System

export interface PersonalDetails {
  edcNumber?: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: 'Male' | 'Female' | 'Other';
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    pinCode: string;
    country: string;
  };
  aadhaarNumber?: string;
  panNumber?: string;
  photo?: string;
}

export interface WorkExperience {
  id: string;
  companyName: string;
  designation: string;
  startDate: string;
  endDate?: string;
  currentlyWorking: boolean;
  responsibilities: string;
  achievements?: string;
  certificateUrl?: string;
}

export interface Education {
  id: string;
  institutionName: string;
  degree: string;
  fieldOfStudy: string;
  startYear: string;
  endYear?: string;
  percentage?: number;
  grade?: string;
  certificateUrl?: string;
}

export interface SalaryHistory {
  id: string;
  companyName: string;
  designation: string;
  ctc: number;
  basePay: number;
  bonuses?: number;
  startDate: string;
  endDate?: string;
  isVisible: boolean; // Privacy control
}

export interface EPFDetails {
  uanNumber: string;
  pfAccountNumber?: string;
  employeeName: string;
  dateOfJoining?: string;
  dateOfExit?: string;
  previousEmployer?: string;
  pfBalance?: number;
  isVerified: boolean;
  lastUpdated: string;
}

export interface VerificationStatus {
  backgroundCheck: {
    status: 'pending' | 'in-progress' | 'verified' | 'failed';
    verifiedBy?: string;
    verifiedDate?: string;
    remarks?: string;
  };
  criminalRecord: {
    status: 'pending' | 'in-progress' | 'clear' | 'issues-found';
    verifiedBy?: string;
    verifiedDate?: string;
    remarks?: string;
  };
  documentVerification: {
    status: 'pending' | 'in-progress' | 'verified' | 'failed';
    verifiedDocuments: string[];
    remarks?: string;
  };
}

export interface BlockchainRecord {
  transactionHash?: string;
  blockNumber?: number;
  dataHash: string;
  timestamp: number;
  network?: string;
}

export interface EmployeeProfile {
  personalDetails: PersonalDetails;
  workExperience: WorkExperience[];
  education: Education[];
  salaryHistory: SalaryHistory[];
  epfDetails?: EPFDetails;
  verificationStatus: VerificationStatus;
  blockchainRecord?: BlockchainRecord;
  createdAt: string;
  updatedAt: string;
  profileCompletion: number;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Form validation result
export interface ValidationResult {
  isValid: boolean;
  errors: { [key: string]: string };
}
