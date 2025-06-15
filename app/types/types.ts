export interface Employees  {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    idCardNumber: string;
    position: string;
    department: string | null;
    salary: number;
    hiredAt: Date;
    status: string;
    photoUrl: string | null;
    updatedAt: Date;
  };
  