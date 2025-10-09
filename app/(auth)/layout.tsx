import { CssBaseline } from "@mui/material";
import AppTheme from "../lib/theme/AppTheme";




export default function AdminLayout({children}: {children: React.ReactNode}) {

    return(
        <AppTheme>
            <CssBaseline enableColorScheme />
                {children}
        </AppTheme>
    )
}