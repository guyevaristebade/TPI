import React from "react";

import { AuthenticationContext } from "../contexts";

export function useAuth() {
  return React.useContext(AuthenticationContext);
}
