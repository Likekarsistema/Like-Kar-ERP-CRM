-- Inserir mais dados de exemplo para contas a pagar se não existirem
DO $$
BEGIN
    -- Verificar se já existem dados
    IF NOT EXISTS (SELECT 1 FROM accounts_payable LIMIT 1) THEN
        -- Inserir dados de exemplo para contas a pagar
        INSERT INTO accounts_payable (supplier_id, invoice_number, description, amount, issue_date, due_date, status) 
        SELECT 
          s.id,
          'PAG-2024-' || LPAD((ROW_NUMBER() OVER())::text, 3, '0'),
          CASE 
            WHEN ROW_NUMBER() OVER() % 5 = 1 THEN 'Compra de peças para estoque'
            WHEN ROW_NUMBER() OVER() % 5 = 2 THEN 'Serviços de terceiros - manutenção'
            WHEN ROW_NUMBER() OVER() % 5 = 3 THEN 'Material de escritório e suprimentos'
            WHEN ROW_NUMBER() OVER() % 5 = 4 THEN 'Combustível e manutenção de veículos'
            ELSE 'Equipamentos e ferramentas'
          END,
          CASE 
            WHEN ROW_NUMBER() OVER() % 5 = 1 THEN 1500.00 + (RANDOM() * 1000)
            WHEN ROW_NUMBER() OVER() % 5 = 2 THEN 800.25 + (RANDOM() * 500)
            WHEN ROW_NUMBER() OVER() % 5 = 3 THEN 250.50 + (RANDOM() * 200)
            WHEN ROW_NUMBER() OVER() % 5 = 4 THEN 450.75 + (RANDOM() * 300)
            ELSE 2000.00 + (RANDOM() * 1500)
          END,
          CURRENT_DATE - INTERVAL '10 days' + (RANDOM() * INTERVAL '20 days'),
          CASE 
            WHEN ROW_NUMBER() OVER() % 4 = 1 THEN CURRENT_DATE + INTERVAL '20 days'
            WHEN ROW_NUMBER() OVER() % 4 = 2 THEN CURRENT_DATE - INTERVAL '3 days'
            WHEN ROW_NUMBER() OVER() % 4 = 3 THEN CURRENT_DATE + INTERVAL '45 days'
            ELSE CURRENT_DATE + INTERVAL '15 days'
          END,
          CASE 
            WHEN ROW_NUMBER() OVER() % 4 = 1 THEN 'pending'
            WHEN ROW_NUMBER() OVER() % 4 = 2 THEN 'overdue'
            WHEN ROW_NUMBER() OVER() % 4 = 3 THEN 'pending'
            ELSE 'paid'
          END
        FROM suppliers s
        LIMIT 15
        ON CONFLICT (invoice_number) DO NOTHING;

        -- Atualizar payment_date para contas pagas
        UPDATE accounts_payable 
        SET payment_date = issue_date + INTERVAL '5 days' + (RANDOM() * INTERVAL '10 days')
        WHERE status = 'paid' AND payment_date IS NULL;

        RAISE NOTICE 'Dados de exemplo inseridos com sucesso';
    ELSE
        RAISE NOTICE 'Dados já existem, pulando inserção';
    END IF;
END $$;
