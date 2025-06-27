/* Defines the authentication state to manage the users authentication information */
export default interface AuthInterface {
  user: UserInterface | null;
  isAuthenticated: boolean;
  status: string;
  access: string;
  refresh: string;
  is_verified: boolean;
}

/* Defines the users object which will include the users information and authentication information
 */
export interface UserInterface {
  id: string;
  first_name: string;
  phone: string;
}
