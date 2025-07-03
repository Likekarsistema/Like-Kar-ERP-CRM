-- Função para atualizar automaticamente contas vencidas
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
    
    RAISE NOTICE 'Contas vencidas atualizadas com sucesso';
END;
$$ LANGUAGE plpgsql;

-- Executar a função
SELECT update_overdue_accounts();
