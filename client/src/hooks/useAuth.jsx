import React, { useContext } from 'react'
import { authContext } from '../providers/AuthProviders'

export default function useAuth() {
   const auth = useContext(authContext);
   return auth
};
