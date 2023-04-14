import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';

import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Box from '@mui/material/Box';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { useState } from 'react';
import TabPanel from '@/components/Navigation/TabPanel';
import { config } from '@/core/config';
import { Typography } from '@mui/material';
import monobankLogo from '/images/monobank-logo.jpeg';
import monobankJar from '/images/monobank-jar.png';

const tabsStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 350,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 1,
  borderRadius: '10px',
};

function a11yProps(index: number): Record<string, string> {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function DonateButton(): JSX.Element {
  const [open, setOpen] = useState(false);
  const handleClose = (): void => setOpen(false);
  const handleOpen = (): void => setOpen(true);

  return (
    <>
      <Button
        startIcon={<MonetizationOnIcon />}
        sx={{ color: 'white', fontSize: '19px' }}
        size="large"
        onClick={handleOpen}
      >
        Donate
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={tabsStyle}>
            <Tabs variant="fullWidth" value={0}>
              <Tab
                icon={(
                  <img
                    width="24"
                    height="24"
                    alt="monobank logo"
                    src={monobankLogo}
                  />
                )}
                iconPosition="start"
                label="Monobank"
                {...a11yProps(0)}
              />
            </Tabs>
            <TabPanel value={0} index={0}>
              <Typography sx={{ mb: 1 }}>
                You can donate if you want to support my open-source projects
                and motivate me to create even more large-scale open-source
                applications.
              </Typography>

              <Button
                size="large"
                target="_blank"
                href={config.donation.monobank.jarUrl}
                endIcon={(
                  <img
                    width="30"
                    height="30"
                    alt="monobank jar logo"
                    src={monobankJar}
                  />
                )}
              >
                Donate through a jar
              </Button>
            </TabPanel>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
