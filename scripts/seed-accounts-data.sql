-- Inserir dados de exemplo para contas a receber
INSERT INTO accounts_receivable (customer_id, invoice_number, description, amount, issue_date, due_date, status) 
SELECT 
  c.id,
  'REC-2024-' || LPAD((ROW_NUMBER() OVER())::text, 3, '0'),
  CASE 
    WHEN ROW_NUMBER() OVER() % 4 = 1 THEN 'Serviço de manutenção preventiva'
    WHEN ROW_NUMBER() OVER() % 4 = 2 THEN 'Venda de peças automotivas'
    WHEN ROW_NUMBER() OVER() % 4 = 3 THEN 'Serviço de reparo de motor'
    ELSE 'Troca de óleo e filtros'
  END,
  CASE 
    WHEN ROW_NUMBER() OVER() % 4 = 1 THEN 850.00
    WHEN ROW_NUMBER() OVER() % 4 = 2 THEN 1200.50
    WHEN ROW_NUMBER() OVER() % 4 = 3 THEN 2500.00
    ELSE 350.75
  END,
  CURRENT_DATE - INTERVAL '15 days',
  CASE 
    WHEN ROW_NUMBER() OVER() % 3 = 1 THEN CURRENT_DATE + INTERVAL '15 days'
    WHEN ROW_NUMBER() OVER() % 3 = 2 THEN CURRENT_DATE - INTERVAL '5 days'
    ELSE CURRENT_DATE + INTERVAL '30 days'
  END,
  CASE 
    WHEN ROW_NUMBER() OVER() % 4 = 1 THEN 'pending'
    WHEN ROW_NUMBER() OVER() % 4 = 2 THEN 'paid'
    WHEN ROW_NUMBER() OVER() % 4 = 3 THEN 'overdue'
    ELSE 'pending'
  END
FROM customers c
LIMIT 10
ON CONFLICT (invoice_number) DO NOTHING;

-- Inserir dados de exemplo para contas a pagar
INSERT INTO accounts_payable (supplier_id, invoice_number, description, amount, issue_date, due_date, status) 
SELECT 
  s.id,
  'PAG-2024-' || LPAD((ROW_NUMBER() OVER())::text, 3, '0'),
  CASE 
    WHEN ROW_NUMBER() OVER() % 4 = 1 THEN 'Compra de peças para estoque'
    WHEN ROW_NUMBER() OVER() % 4 = 2 THEN 'Serviços de terceiros'
    WHEN ROW_NUMBER() OVER() % 4 = 3 THEN 'Material de escritório'
    ELSE 'Combustível e manutenção'
  END,
  CASE 
    WHEN ROW_NUMBER() OVER() % 4 = 1 THEN 1500.00
    WHEN ROW_NUMBER() OVER() % 4 = 2 THEN 800.25
    WHEN ROW_NUMBER() OVER() % 4 = 3 THEN 250.50
    ELSE 450.75
  END,
  CURRENT_DATE - INTERVAL '10 days',
  CASE 
    WHEN ROW_NUMBER() OVER() % 3 = 1 THEN CURRENT_DATE + INTERVAL '20 days'
    WHEN ROW_NUMBER() OVER() % 3 = 2 THEN CURRENT_DATE - INTERVAL '3 days'
    ELSE CURRENT_DATE + INTERVAL '45 days'
  END,
  CASE 
    WHEN ROW_NUMBER() OVER() % 4 = 1 THEN 'pending'
    WHEN ROW_NUMBER() OVER() % 4 = 2 THEN 'paid'
    WHEN ROW_NUMBER() OVER() % 4 = 3 THEN 'overdue'
    ELSE 'pending'
  END
FROM suppliers s
LIMIT 8
ON CONFLICT (invoice_number) DO NOTHING;

-- Atualizar payment_date para contas pagas
UPDATE accounts_receivable 
SET payment_date = issue_date + INTERVAL '10 days'
WHERE status = 'paid';

UPDATE accounts_payable 
SET payment_date = issue_date + INTERVAL '8 days'
WHERE status = 'paid';
