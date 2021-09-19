import database from '@/database';

export async function getAllCustomer(): Promise<any[]> {
  const customers = await database.select('*').from('customers');
  return customers;
}

export async function addCustomer(name: string): Promise<any> {
  await database.insert({ name }).into('customers');
}
