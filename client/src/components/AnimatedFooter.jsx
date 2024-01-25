import React from "react";
import {Server as ServerIcon, Settings as SettingsIcon, Mails as MailIcon, Layers as LayerIcon, Keyboard as KeyboardIcon, Clock8 as ClockIocn} from 'lucide-react'

function AnimatedFooter() {
    return (
        <footer>
            <div className="wave flex justify-around">
                <ServerIcon /><SettingsIcon /><MailIcon /><KeyboardIcon /><ServerIcon /><SettingsIcon /><LayerIcon /><KeyboardIcon /><LayerIcon /><ServerIcon /><SettingsIcon /><LayerIcon /><KeyboardIcon /><ClockIocn /><KeyboardIcon /><KeyboardIcon /><LayerIcon />
            </div>
            <div className="wave flex justify-around">
                <SettingsIcon /><MailIcon /><KeyboardIcon /><LayerIcon /><ClockIocn /><SettingsIcon /><ServerIcon /><LayerIcon /><SettingsIcon /><MailIcon /><KeyboardIcon /><LayerIcon /><ClockIocn /><SettingsIcon /><ServerIcon /><LayerIcon />
            </div>
            <div className="wave flex justify-around">
                <ServerIcon /><KeyboardIcon /><MailIcon /><LayerIcon /><ServerIcon /><ClockIocn /><MailIcon /><ServerIcon /><KeyboardIcon /><MailIcon /><LayerIcon /><ServerIcon /><ClockIocn /><MailIcon /><ServerIcon /><KeyboardIcon /><MailIcon /><LayerIcon /><ServerIcon /><ClockIocn /><MailIcon />
            </div>
        </footer>
    );
}

export default AnimatedFooter;