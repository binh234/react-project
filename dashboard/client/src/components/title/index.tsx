import { Link } from "react-router-dom";
import Box from "@mui/material/Box";

import { logo, yariga } from '../../assets'

type TitleProps = {
    collapsed: boolean;
};

export const Title: React.FC<TitleProps> = ({ collapsed }) => {
    return (
        <Link to="/">
            <Box
                sx={{
                    height: "72px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "text.primary",
                }}
            >
                <img src={collapsed ? logo : yariga} alt="logo" />
            </Box>
        </Link>
    );
};