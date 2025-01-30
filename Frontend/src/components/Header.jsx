// Import Statements
import { useContext, useState } from "react";
import styles from "./styles/Header.module.css";
import axios from "axios";
import { Avatar, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { AppContext } from "../Store/Context";
import { IoMenu } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";



const Header = () => {
    // const { globalData, setGlobalData } = useContext(AppContext);


    const navigate = useNavigate();

    // States to manage the open and closing of side menu and profile menu for mobile screens
    const [featuresAnchorEl, setFeaturesAnchorEl] = useState(null);
    const [adminAnchorEl, setAdminAnchorEl] = useState(null);

    // Pages
    const pages = [
        { Name: "Appointments", Link: "appointments" },
        { Name: "Doctors", Link: "doctors" },
        { Name: "Patients", Link: "patients" },
    ];

    // Profile
    const Admin = [
        { Name: "Profile" },
        { Name: "Add Profile Picture" },
        { Name: "Logout" },
    ];

    // Functions
    const handleFeaturesClick = (e) => setFeaturesAnchorEl(e.currentTarget);
    const handleAdminClick = (e) => setAdminAnchorEl(e.currentTarget);
    const handleCloseFeatures = () => setFeaturesAnchorEl(null);
    const handleCloseAdmin = () => setAdminAnchorEl(null);
    const apiCall = async (link) => {
        try {
            const response = await axios.get(`http://localhost:5000/${link}`);
            setGlobalData([...globalData, response.data]);
            console.log("Global Data Populated");
        }
        catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    
    return (
        <header className={styles.header}>
            <nav className={styles.navbar}>

                {/* Menu Icon for Mobile Screens */}
                <IconButton
                    onClick={handleFeaturesClick}
                    sx={{
                        display: "none",
                        padding: { xs: ".12em" },
                        "@media (max-width: 520px)": { display: "block" },
                    }}
                    color="inherit">
                    <IoMenu style={{ width: "100%", height: "100%" }} color="#0c306f" />
                </IconButton>

                {/* Pages Menu for smaller screens that is opened by menu icon */}
                <Menu
                    anchorEl={featuresAnchorEl}
                    open={Boolean(featuresAnchorEl)}
                    onClose={handleCloseFeatures}
                    anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                    }}
                >
                    {pages.map((element) => (
                        <MenuItem
                            key={element.Name}
                            onClick={() => {
                                handleCloseFeatures();
                                navigate(`/${element.Link}`);
                            }}
                        >
                            {element.Name}
                        </MenuItem>
                    ))}
                </Menu>

                {/* Logo */}
                <div className={styles.Logo}>
                    <Link to="/">
                        <h1>
                            Hospital <span>++</span>
                        </h1>
                        <p>Your Health, Our Priority</p>
                    </Link>
                </div>

                {/* Pages List for Larger Screens */}
                <ul className={styles.unorderedList}>
                    {pages.map((element, index) => (
                        <li key={index}
                            // onClick={() => apiCall(element.Link)}
                        >
                            <Link to={`/${element.Link}`}>
                                {element.Name}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Profile Icon */}
                <IconButton
                    sx={{
                        width: "3.5rem",
                        height: "3.5rem",
                        marginRight: "2rem",
                        "@media (max-width: 380px)": { display: "none" },
                    }}
                    onClick={handleAdminClick}>
                    <Avatar
                        alt="Admin"
                        sx={{
                            width: "100%",
                            height: "100%",
                            bgcolor: "#0c306f",
                        }}>
                        A
                    </Avatar>
                </IconButton>

                {/* Profile Menu for profile icon */}
                <Menu
                    anchorEl={adminAnchorEl}
                    open={Boolean(adminAnchorEl)}
                    onClose={handleCloseAdmin}
                    anchorOrigin={{
                        vertical: "top",
                        horizontal: "left",
                    }}
                >
                    {Admin.map((element) => (
                        <MenuItem key={element.Name} onClick={handleCloseAdmin}>
                            <Typography variant="h6">{element.Name}</Typography>
                        </MenuItem>
                    ))}
                </Menu>
            </nav>
        </header>
    );
};

export default Header;