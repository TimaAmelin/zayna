import { Box, Button, Input, styled } from '@mui/material';

export const SettingsContainer = styled(Box)(() => ({
    backgroundColor: '#1F1F2E',
    height: '100%',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
}));

export const SettingsMainContainer = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
}));

export const SettingsTitleContainer = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 50,
    color: '#fff',
    fontSize: 26,
    fontWeight: 600,
    marginBottom: 30,
}));

export const SettingsSecondaryTextContainer = styled(Box)(() => ({
    width: '90%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'start',
    color: '#fff',
    fontSize: 12,
    fontWeight: 600,
    marginBottom: 5,
}));

export const SettingsInput = styled(Input)(() => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: '#fff',
    fontSize: 14,
    fontWeight: 600,
    backgroundColor: '#2E3342',
    width: '90%',
    height: 56,
    borderRadius: 10,
    marginTop: 10,
    padding: 10,
}));

export const SettingsButtonsContainer = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    margin: 40,
}));

export const SettingsButton = styled(Button)(() => ({
    borderRadius: 12,
    height: 60,
    width: '90%',
    backgroundColor: '#7ADA46',
    color: '#000',
    fontSize: 16,
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 11,
    '&:hover': {
        backgroundColor: '#fff',
    },
    textTransform: 'none',
    margin: 5,
    zIndex: 3,
}));