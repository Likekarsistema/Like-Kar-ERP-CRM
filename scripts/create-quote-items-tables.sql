-- Criar tabela para itens de orçamento (produtos/serviços que podem ser orçados)
CREATE TABLE IF NOT EXISTS quote_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100),
  price DECIMAL(10,2) NOT NULL DEFAULT 0,
  image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_quote_items_category ON quote_items(category);
CREATE INDEX IF NOT EXISTS idx_quote_items_active ON quote_items(is_active);
CREATE INDEX IF NOT EXISTS idx_quote_items_name ON quote_items(name);

-- Habilitar RLS (Row Level Security)
ALTER TABLE quote_items ENABLE ROW LEVEL SECURITY;

-- Criar políticas de segurança (permitir todas as operações por enquanto)
CREATE POLICY "Allow all operations on quote_items" ON quote_items
  FOR ALL USING (true) WITH CHECK (true);

-- Trigger para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_quote_items_updated_at 
  BEFORE UPDATE ON quote_items 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
