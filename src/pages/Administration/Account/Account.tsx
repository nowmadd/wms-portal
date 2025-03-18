import { useMemo } from 'react';
import { accountsServices } from '../../../shared/services/accountsServices';
import { useAccountForm } from './useAccountForm';
import { ISpecificAccount } from '../../../shared/types/account.types';
import { AccountCont, FormCont, InfoCont, Section } from './Account.styles';
import { Typography, Link, Skeleton } from '@mui/material';
import TextField from '../../../shared/components/TextField/TextField';
import Select from '../../../shared/components/Select/Select';
import Import from './components/Import/Import';
import InfoPanel from '../../../shared/components/InfoPanel/InfoPanel';

import industry from '../../../shared/data/industry.json';
import countries from '../../../shared/data/countries.json';

const sampleOptions = [
  { value: 'The Tower', label: 'The Tower' },
  { value: 'First Avenue', label: 'First Avenue' },
  { value: 'Johnson D.C.', label: 'Johnson D.C.' },
  { value: 'United Kingdom.', label: 'United Kingdom' },
  { value: 'JC1 1AA', label: 'JC1 1AA' },
];

const { getAccount } = accountsServices();
const Account = () => {
  const { data, isLoading } = getAccount();

  const accountData = useMemo(() => {
    if (isLoading) {
      return;
    } else {
      return data ? data.data : undefined;
    }
  }, [data, isLoading]);

  const onSubmit = async (values: ISpecificAccount) => {};

  const { form } = useAccountForm({ onSubmit, account: accountData });

  const {
    account_name,
    account_industry,
    account_owner,
    account_addr_city,
    account_addr_country,
    account_addr_line1,
    account_addr_line2,
    account_addr_postcode,
  } = form.values;

  return (
    <AccountCont>
      <Typography fontSize={24} fontWeight={900}>
        Accounts
      </Typography>
      <Typography fontSize={15} fontWeight={500}>
        The account can be managed here, destructive actions are protected.{' '}
        {/* <Link sx={{ cursor: 'pointer' }} color={'#0D6EFD'}>
          Learn more
        </Link> */}
      </Typography>
      <FormCont>
        <Section gap="10px">
          {isLoading ? (
            <Skeleton variant="rounded" height={40} />
          ) : (
            <TextField label="Company Name" value={account_name} fullWidth />
          )}
          {isLoading ? (
            <Skeleton variant="rounded" height={40} />
          ) : (
            <Select
              label="Industry"
              required
              options={industry}
              value={industry.find((item) => item.value === account_industry)}
              onChange={(value) => form.setFieldValue('account_industry', value?.value)}
              onError={Boolean(form.touched.account_industry) && Boolean(form.errors.account_industry)}
              helperText={Boolean(form.touched.account_industry) ? form.errors.account_industry : ''}
              onBlur={form.handleBlur}
            />
          )}
          {isLoading ? (
            <Skeleton variant="rounded" height={40} />
          ) : (
            <Select
              isMulti
              value={account_owner ? account_owner.map((owner) => ({ value: owner, label: owner })) : []}
              label="Account Owner"
            />
          )}
        </Section>
        <Section gap="5px">
          {isLoading ? (
            <Skeleton variant="rounded" height={40} />
          ) : (
            <TextField label="Business Address" value={account_addr_line1} fullWidth />
          )}
          {isLoading ? <Skeleton variant="rounded" height={40} /> : <TextField value={account_addr_line2} fullWidth />}
          {isLoading ? <Skeleton variant="rounded" height={40} /> : <TextField value={account_addr_city} fullWidth />}
          {/* <TextField value={account_addr_country} fullWidth /> */}
          {isLoading ? (
            <Skeleton variant="rounded" height={40} />
          ) : (
            <Select
              required
              options={countries}
              placeholder="Country"
              value={countries.find((item) => item.value === account_addr_country)}
              // onChange={(value) => form.setFieldValue('account_addr_country', value?.value)}
              onError={Boolean(form.touched.account_addr_country) && Boolean(form.errors.account_addr_country)}
              helperText={Boolean(form.touched.account_addr_country) ? form.errors.account_addr_country : ''}
              onBlur={form.handleBlur}
            />
          )}
          {isLoading ? (
            <Skeleton variant="rounded" height={40} />
          ) : (
            <TextField value={account_addr_postcode} fullWidth />
          )}
        </Section>
      </FormCont>
    </AccountCont>
  );
};

export default Account;
