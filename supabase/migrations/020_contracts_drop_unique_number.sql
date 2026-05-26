-- Allow multiple contracts to share the same contract_number
-- (partial returns of the same deal reuse the base contract number, e.g. 260147)
ALTER TABLE contracts DROP CONSTRAINT IF EXISTS contracts_contract_number_key;
