import { OpenInNew as RedirectExternal, type SvgIconComponent } from '@mui/icons-material';
import { Icon, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

type Props = {
    handleClick?: () => void;
    title: string;
    isSelected?: boolean;
    icon: SvgIconComponent | string;
    level: number;
    disabled?: boolean;
    href?: string;
    target?: string;
    collapsed?: boolean;
};

export default function SidenavItem({
    handleClick,
    title,
    isSelected,
    icon,
    level,
    disabled = false,
    href,
    target,
    collapsed = false
}: Readonly<Props>) {
    const isExternal = Boolean(href);

    return (
        <ListItemButton
            selected={isSelected && !isExternal}
            disabled={disabled}
            onClick={handleClick}
            component={isExternal ? 'a' : 'div'}
            href={href}
            target={target}
            rel={target === '_blank' ? 'noopener noreferrer' : undefined}
        >
            <ListItemIcon sx={{ ml: level }}>
                {typeof icon === 'string' ? (
                    <img src={icon} alt="" aria-hidden="true" style={{ width: 20, marginInline: 2, height: 24 }} />
                ) : (
                    <Icon style={{ width: 24, height: 24 }} component={icon} />
                )}
            </ListItemIcon>

            <ListItemText
                primary={title}
                sx={{ opacity: collapsed ? 0 : 1 }}
            />

            {isExternal && (
                <ListItemIcon sx={{ opacity: collapsed ? 0 : 1 }}>
                    <RedirectExternal fontSize="small" style={{ color: '#BBC2D6' }} />
                </ListItemIcon>
            )}
        </ListItemButton>
    );
}