import { Box, Button, styled } from '@mui/material';

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

export const SettingsCard = styled(Box)(() => ({
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
}));

export const SettingsPrivacyPolicy = styled(Box)(() => ({
    marginTop: 20,
    fontSize: 12,
    fontWeight: 400,
    color: '#C3C2C2',
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
    margin: 40,
    zIndex: 3,
}));