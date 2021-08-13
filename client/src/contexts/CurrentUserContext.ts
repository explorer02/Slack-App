import React from "react";
import { CurrentUser } from "types/User";

export const CurrentUserContext = React.createContext<CurrentUser>(undefined);
