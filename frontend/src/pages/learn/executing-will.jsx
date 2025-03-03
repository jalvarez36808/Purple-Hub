import React from 'react';
import { Container, Typography, Box, Paper, List, ListItem, ListItemText, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
}));

const StyledListItem = styled(ListItem)({
  display: 'list-item',
  listStyleType: 'disc',
  marginLeft: '1.5em',
  padding: '0.5em',
});

export default function ExecutingWill() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Executing the Will: A Guide to Settling Your Loved One's Estate
        </Typography>

        <StyledPaper elevation={3}>
          <Typography variant="h6" gutterBottom>
            What Does It Mean to Execute a Will?
          </Typography>
          <Typography paragraph>
            The executor, or estate administrator, is responsible for managing the deceased's assets, settling debts, and distributing property as outlined in the will. This process may require probate, a legal proceeding that validates the will and ensures everything is handled correctly.
          </Typography>
          <Typography paragraph>
            If no will exists, state laws determine how the estate is divided.
          </Typography>
        </StyledPaper>

        <StyledPaper elevation={3}>
          <Typography variant="h5" gutterBottom>
            Steps to Execute the Will
          </Typography>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Step 1: Locate and File the Will
            </Typography>
            <List>
              <StyledListItem>
                <ListItemText primary="Find the original will and any related estate planning documents" />
              </StyledListItem>
              <StyledListItem>
                <ListItemText primary="File the will with the local probate court to begin the legal process" />
              </StyledListItem>
              <StyledListItem>
                <ListItemText primary="If probate is required, the court will officially appoint an executor (typically named in the will)" />
              </StyledListItem>
            </List>
            <Typography variant="subtitle2" color="text.secondary">
              Tip: If you're unsure whether probate is necessary, consult an estate attorney or the local court clerk.
            </Typography>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Step 2: Identify and Secure Assets
            </Typography>
            <List>
              <StyledListItem>
                <ListItemText primary="Take inventory of all assets, including bank accounts, real estate, vehicles, investments, and personal belongings" />
              </StyledListItem>
              <StyledListItem>
                <ListItemText primary="Ensure property and financial accounts are protected to prevent unauthorized access or misuse" />
              </StyledListItem>
              <StyledListItem>
                <ListItemText primary="Keep track of any income the estate receives (such as rental income or dividends)" />
              </StyledListItem>
            </List>
            <Typography variant="subtitle2" color="text.secondary">
              Tip: Lock valuable items away, notify financial institutions, and inform beneficiaries about the next steps.
            </Typography>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Step 3: Notify Creditors & Pay Outstanding Debts
            </Typography>
            <List>
              <StyledListItem>
                <ListItemText primary="Notify banks, credit card companies, and lenders of the death" />
              </StyledListItem>
              <StyledListItem>
                <ListItemText primary="Publish a death notice (if required) to alert unknown creditors" />
              </StyledListItem>
              <StyledListItem>
                <ListItemText primary="Use estate funds to pay valid debts, including medical bills, loans, and taxes" />
              </StyledListItem>
            </List>
            <Typography variant="subtitle2" color="text.secondary">
              Note: You are not personally responsible for debts unless you co-signed on a loan or credit card.
            </Typography>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Step 4: Distribute Assets to Beneficiaries
            </Typography>
            <List>
              <StyledListItem>
                <ListItemText primary="Follow the instructions in the will to transfer property and funds to heirs" />
              </StyledListItem>
              <StyledListItem>
                <ListItemText primary="If probate is required, wait for the court to approve distributions" />
              </StyledListItem>
              <StyledListItem>
                <ListItemText primary="Ensure all legal requirements, including tax filings, are met before finalizing transfers" />
              </StyledListItem>
            </List>
            <Typography variant="subtitle2" color="text.secondary">
              Tip: Some assets, like life insurance or retirement accounts, pass directly to named beneficiaries and do not go through probate.
            </Typography>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Step 5: Handle Probate Disputes (If Necessary)
            </Typography>
            <Typography paragraph>
              If someone contests the will, claiming it is invalid or unfair, probate litigation may occur. Common disputes include:
            </Typography>
            <List>
              <StyledListItem>
                <ListItemText primary="Allegations of undue influence or fraud" />
              </StyledListItem>
              <StyledListItem>
                <ListItemText primary="Concerns about the deceased's mental state when drafting the will" />
              </StyledListItem>
              <StyledListItem>
                <ListItemText primary="Conflicts between heirs over asset distribution" />
              </StyledListItem>
            </List>
            <Typography variant="subtitle2" color="text.secondary">
              Tip: If a dispute arises, consult an estate attorney to protect the estate's integrity and ensure a fair resolution.
            </Typography>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Step 6: Finalize the Estate & Close Accounts
            </Typography>
            <List>
              <StyledListItem>
                <ListItemText primary="File any final tax returns required for the estate" />
              </StyledListItem>
              <StyledListItem>
                <ListItemText primary="Obtain court approval (if applicable) to officially close the estate" />
              </StyledListItem>
              <StyledListItem>
                <ListItemText primary="Provide final accounting to the court and distribute remaining funds" />
              </StyledListItem>
            </List>
            <Typography paragraph>
              Once these steps are complete, the executor's duties are fulfilled, and the estate is officially closed.
            </Typography>
          </Box>
        </StyledPaper>

        <StyledPaper elevation={3}>
          <Typography variant="h6" gutterBottom>
            Additional Support
          </Typography>
          <Typography paragraph>
            The will execution process can be complicated, but you don't have to handle it alone. Consider seeking help from:
          </Typography>
          <List>
            <StyledListItem>
              <ListItemText 
                primary="An estate attorney"
                secondary="For legal guidance on probate, disputes, and tax matters"
              />
            </StyledListItem>
            <StyledListItem>
              <ListItemText 
                primary="A financial advisor"
                secondary="To ensure assets are managed and distributed properly"
              />
            </StyledListItem>
            <StyledListItem>
              <ListItemText 
                primary="A probate court clerk"
                secondary="For information on local probate requirements"
              />
            </StyledListItem>
          </List>
          <Typography paragraph sx={{ mt: 2 }}>
            Handling a loved one's estate is a difficult responsibility, but by following these steps, you can ensure their final wishes are honored while bringing closure to the process.
          </Typography>
        </StyledPaper>
      </Box>
    </Container>
  );
} 