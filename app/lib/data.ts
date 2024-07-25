import { sql } from '@vercel/postgres';
import { auth } from "@/auth"
import {
  CustomerField,
  CustomersTableType,
  InvoiceForm,
  InvoicesTable,
  LatestInvoiceRaw,
  LatestPost,
  Revenue,
  ProfileField,
} from './definitions';
import { formatCurrency } from './utils';

export async function fetchRevenue() {
  try {
    const data = await sql<Revenue>`SELECT * FROM revenue`;

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchLatestInvoices() {
  try {
    const data = await sql<LatestInvoiceRaw>`
      SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      ORDER BY invoices.date DESC
      `;

    const latestInvoices = data.rows.map((invoice) => ({
      ...invoice,
      amount: formatCurrency(invoice.amount),
    }));
    return latestInvoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  }
}

export async function fetchLatestPosts(mode:string, userid:string, id:string) {
  try {
    if(mode == "followers") {
      const data = await sql<LatestPost>`
      SELECT p.tips, p.text, p.date, u.name, u.image_url, u.email, p.customer_id, p.id 
      FROM posts p 
      LEFT JOIN following f ON p.customer_id = f.followed AND f.follower = ${userid} 
      JOIN users u ON p.customer_id = u.id 
      WHERE p.customer_id = ${userid} OR f.followed IS NOT NULL 
      ORDER BY p.date DESC

      `;
      const latestPosts = data.rows;
      return latestPosts;
    } else if (mode == "user") {
      const data = await sql<LatestPost>`
      SELECT posts.tips, posts.text, posts.date, users.name, users.image_url, users.email, posts.customer_id, posts.id
      FROM posts
      JOIN users ON posts.customer_id = users.id
      WHERE posts.customer_id = ${userid}
      ORDER BY posts.date DESC
      `;
      const latestPosts = data.rows;
      return latestPosts;
    } else if (mode == "follower") {
      const data = await sql<LatestPost>`
      SELECT posts.tips, posts.text, posts.date, users.name, users.image_url, users.email, posts.customer_id, posts.id
      FROM posts
      JOIN users ON posts.customer_id = users.id
      WHERE posts.customer_id = ${id}
      ORDER BY posts.date DESC
      `;
      const latestPosts = data.rows;
      return latestPosts;
    } else {
      const data = await sql<LatestPost>`
      SELECT posts.tips, posts.text, posts.date, users.name, users.image_url, users.email, posts.customer_id, posts.id
      FROM posts
      JOIN users ON posts.customer_id = users.id
      ORDER BY posts.date DESC
      `;
      const latestPosts = data.rows;
      return latestPosts;
    }
  
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest posts.');
  }
}

export async function fetchTokens(userid: string) {
  try {
    const tokenCountPromise = sql`SELECT users.tokens FROM users WHERE id=${userid}`
    const data = await Promise.all([tokenCountPromise]);
    const tokenCount = Number(data[0].rows[0].tokens ?? '0');
    return tokenCount;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

export async function fetchCardData() {
  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
    const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
    const invoiceStatusPromise = sql`SELECT
         SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
         SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
         FROM invoices`;

    const data = await Promise.all([
      invoiceCountPromise,
      customerCountPromise,
      invoiceStatusPromise,
    ]);

    const numberOfInvoices = Number(data[0].rows[0].count ?? '0');
    const numberOfCustomers = Number(data[1].rows[0].count ?? '0');
    const totalPaidInvoices = formatCurrency(data[2].rows[0].paid ?? '0');
    const totalPendingInvoices = formatCurrency(data[2].rows[0].pending ?? '0');

    return {
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredInvoices(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const invoices = await sql<InvoicesTable>`
      SELECT
        users.name,
        users.id,
        users.image_url
      FROM users
      WHERE
        users.name ILIKE ${`%${query}%`} 
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return invoices.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

export async function fetchInvoicesPages(query: string) {
  try {
    const count = await sql`SELECT COUNT(*)
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE
      customers.name ILIKE ${`%${query}%`} OR
      customers.email ILIKE ${`%${query}%`} OR
      invoices.amount::text ILIKE ${`%${query}%`} OR
      invoices.date::text ILIKE ${`%${query}%`} OR
      invoices.status ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchInvoiceById(id: string) {
  try {
    const data = await sql<InvoiceForm>`
      SELECT
        invoices.id,
        invoices.customer_id,
        invoices.amount,
        invoices.status
      FROM invoices
      WHERE invoices.id = ${id};
    `;

    const invoice = data.rows.map((invoice) => ({
      ...invoice,
      // Convert amount from cents to dollars
      amount: invoice.amount / 100,
    }));

    return invoice[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}

export async function fetchCustomers() {
  try {
    const data = await sql<CustomerField>`
      SELECT
        id,
        name
      FROM customers
      ORDER BY name ASC
    `;

    const customers = data.rows;
    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}

export async function fetchProfile(id : string) {
  try {
    const data = await sql<ProfileField>`
    SELECT
      name,
      image_url
    FROM users
    WHERE id = ${id}
    `
    const profile = data.rows[0];
    return profile;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch profile.');
  }
}

export async function fetchFollowers(id : string) {
  try {
    const data = await sql`
    SELECT COUNT(*) AS count_of_value
    FROM following
    WHERE followed = ${id};
    `
    
    const profile = data.rows[0];
    return profile;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch profile.');
  }
}

export async function isFriend(followerId : string, followedId: string) {
  try {
    const data = await sql<ProfileField>`
    SELECT * FROM following WHERE follower = ${followerId} AND followed = ${followedId}
    `
    return data;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch followings.');
  }
}

export async function fetchFilteredCustomers(query: string) {
  try {
    const data = await sql<CustomersTableType>`
		SELECT
		  customers.id,
		  customers.name,
		  customers.email,
		  customers.image_url,
		  COUNT(invoices.id) AS total_invoices,
		  SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
		  SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
		FROM customers
		LEFT JOIN invoices ON customers.id = invoices.customer_id
		WHERE
		  customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`}
		GROUP BY customers.id, customers.name, customers.email, customers.image_url
		ORDER BY customers.name ASC
	  `;

    const customers = data.rows.map((customer) => ({
      ...customer,
      total_pending: formatCurrency(customer.total_pending),
      total_paid: formatCurrency(customer.total_paid),
    }));

    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch customer table.');
  }
}

export async function getCurrentUser() {

  const session = await auth();
  if (!session?.user) return null

  try {
    const data = await sql`
    SELECT 
      users.name,
      users.image_url
    FROM users
    WHERE id = ${session.user.id}`;

    const user = {
      name: data.rows[0].name,
      image_url: data.rows[0].image_url
    }

    return user;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch customer table.');
  }
 
}
