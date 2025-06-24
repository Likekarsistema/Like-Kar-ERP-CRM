-- Criar tabela de contas a receber
CREATE TABLE IF NOT EXISTS accounts_receivable (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
  invoice_number VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  amount DECIMAL(10,2) NOT NULL,
  issue_date DATE NOT NULL,
  due_date DATE NOT NULL,
  payment_date DATE,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'overdue', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar tabela de contas a pagar
CREATE TABLE IF NOT EXISTS accounts_payable (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  supplier_id UUID REFERENCES suppliers(id) ON DELETE CASCADE,
  invoice_number VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  amount DECIMAL(10,2) NOT NULL,
  issue_date DATE NOT NULL,
  due_date DATE NOT NULL,
  payment_date DATE,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'overdue', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_accounts_receivable_customer_id ON accounts_receivable(customer_id);
CREATE INDEX IF NOT EXISTS idx_accounts_receivable_status ON accounts_receivable(status);
CREATE INDEX IF NOT EXISTS idx_accounts_receivable_due_date ON accounts_receivable(due_date);

CREATE INDEX IF NOT EXISTS idx_accounts_payable_supplier_id ON accounts_payable(supplier_id);
CREATE INDEX IF NOT EXISTS idx_accounts_payable_status ON accounts_payable(status);
CREATE INDEX IF NOT EXISTS idx_accounts_payable_due_date ON accounts_payable(due_date);

-- Trigger para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_accounts_receivable_updated_at 
    BEFORE UPDATE ON accounts_receivable 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_accounts_payable_updated_at 
    BEFORE UPDATE ON accounts_payable 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Função para atualizar status de contas vencidas
CREATE OR REPLACE FUNCTION update_overdue_accounts()
RETURNS void AS $$
BEGIN
    -- Atualizar contas a receber vencidas
    UPDATE accounts_receivable 
    SET status = 'overdue' 
    WHERE status = 'pending' 
    AND due_date < CURRENT_DATE;
    
    -- Atualizar contas a pagar vencidas
    UPDATE accounts_payable 
    SET status = 'overdue' 
    WHERE status = 'pending' 
    AND due_date < CURRENT_DATE;
END;
$$ LANGUAGE plpgsql;

-- Executar a função para marcar contas vencidas
SELECT update_overdue_accounts();
