// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
  id: string;
  username: string;
  email: string;
  password: string;
  image_url: string;
  tokens: number;
}; 

export type Customer = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

export type Invoice = {
  id: string;
  customer_id: string;
  amount: number;
  date: string;
  // In TypeScript, this is called a string union type.
  // It means that the "status" property can only be one of the two strings: 'pending' or 'paid'.
  status: 'pending' | 'paid';
};

export type Post = {
  id: string;
  customer_id: string;
  tips: number;
  text: string;
  date: string;
};

export type Revenue = {
  month: string;
  revenue: number;
};

export type LatestInvoice = {
  id: string;
  name: string;
  image_url: string;
  email: string;
  amount: string;
};

export type LatestPost = {
  tips: number;
  text: string;
  username: string;
  image_url: string;
  email: string;
  customer_id: string;
  id: string;
  date: string;
};

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export type LatestInvoiceRaw = Omit<LatestInvoice, 'amount'> & {
  amount: number;
};

export type InvoicesTable = {
  id: string;
  customer_id: string;
  username: string;
  email: string;
  image_url: string;
  date: string;
  amount: number;
  status: 'pending' | 'paid';
};

export type CustomersTableType = {
  id: string;
  username: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: number;
  total_paid: number;
};

export type FormattedCustomersTable = {
  id: string;
  username: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: string;
  total_paid: string;
};

export type FormattedFollowersTable = {
  bio: string;
  email: string;
  followed: string;
  follower: string;
  id: string;
  image_url: string;
  username: string;
  password: string;
  tokens: number
};


export type CustomerField = {
  id: string;
  username: string;
};

export type ProfileField = {
  username: string;
  image_url: string;
  bio: string;
}

export type InvoiceForm = {
  id: string;
  customer_id: string;
  amount: number;
  status: 'pending' | 'paid';
};

export type FormattedComments = {
  comment_id: string;
  post_id: string;
  text: string;
  date: string;
  commenter_id: string;
  user_id: string;
  username: string;
  image_url: string;
}

export type Notification = {
  id: string;
	rec_userid: string;
	send_userid: string;
	seen: boolean;
	type: string;
	postid: string;
	date: string;
}

  