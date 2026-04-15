import { ListItemButton, ListItemText, ListItemIcon, Icon } from '@mui/material';
import { OpenInNew as RedirectExternal, type SvgIconComponent } from '@mui/icons-material';

type Props = {
    handleClick?: () => void;
    title: string;
    isSelected?: boolean;
    icon: SvgIconComponent;
    level: number;
    disabled?: boolean;
    href?: string;
    target?: string;
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
                <Icon component={icon} />
            </ListItemIcon>
            <ListItemText
                primary={title}
                sx={{
                    wordWrap: 'break-word',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                    textAlign: 'left',
                    display: 'block',
                }}
            />
            {isExternal && (
                <ListItemIcon sx={{ minWidth: 'auto' }}>
                    <RedirectExternal fontSize="small" color="action" />
                </ListItemIcon>
            )}
        </ListItemButton>
    );
}