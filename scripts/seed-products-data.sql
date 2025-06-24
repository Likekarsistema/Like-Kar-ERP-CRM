-- Inserir categorias padrão
INSERT INTO product_categories (name, description) VALUES
('Multimídia', 'Centrais multimídia, rádios e acessórios de som'),
('Acessórios', 'Acessórios diversos para veículos'),
('Pneus', 'Pneus de todas as medidas e marcas'),
('Freios', 'Pastilhas, discos e componentes de freio'),
('Óleos', 'Óleos lubrificantes e fluidos'),
('Suspensão', 'Amortecedores, molas e componentes'),
('Elétrica', 'Componentes elétricos e eletrônicos'),
('Motor', 'Peças e componentes do motor'),
('Transmissão', 'Peças de câmbio e transmissão'),
('Carroceria', 'Peças de lataria e carroceria')
ON CONFLICT (name) DO NOTHING;

-- Inserir fornecedores padrão
INSERT INTO suppliers (name, document, email, phone, contact_person) VALUES
('Distribuidora Som & Cia Ltda', '12.345.678/0001-90', 'vendas@somecialtda.com.br', '(11) 3456-7890', 'Carlos Silva'),
('AutoPeças Brasil Ltda', '98.765.432/0001-10', 'comercial@autopecasbrasil.com.br', '(11) 2345-6789', 'Maria Santos'),
('Pneus & Rodas Express', '11.222.333/0001-44', 'pedidos@pneusrodas.com.br', '(11) 4567-8901', 'João Oliveira'),
('Óleos & Lubrificantes SA', '55.666.777/0001-88', 'vendas@oleoslubrificantes.com.br', '(11) 5678-9012', 'Ana Costa'),
('Ferramentas Pro Ltda', '33.444.555/0001-22', 'atendimento@ferramentaspro.com.br', '(11) 6789-0123', 'Pedro Lima')
ON CONFLICT (document) DO NOTHING;

-- Inserir produtos de exemplo
WITH category_ids AS (
    SELECT id, name FROM product_categories
),
supplier_ids AS (
    SELECT id, name FROM suppliers
)
INSERT INTO products (
    name, description, sku, category_id, supplier_id, brand, model,
    cost_price, sale_price, current_stock, min_stock, max_stock,
    unit_of_measure, status
)
SELECT 
    'Central Multimídia Pioneer DMH-G228BT',
    'Central multimídia com tela de 6.2", Bluetooth, USB e entrada auxiliar',
    'MULT-001',
    (SELECT id FROM category_ids WHERE name = 'Multimídia'),
    (SELECT id FROM supplier_ids WHERE name = 'Distribuidora Som & Cia Ltda'),
    'Pioneer',
    'DMH-G228BT',
    650.00,
    899.99,
    15,
    5,
    50,
    'UN',
    'ativo'
UNION ALL
SELECT 
    'Câmera de Ré Multilaser AU013',
    'Câmera de ré com visão noturna e ângulo de 170°',
    'ACESS-001',
    (SELECT id FROM category_ids WHERE name = 'Acessórios'),
    (SELECT id FROM supplier_ids WHERE name = 'AutoPeças Brasil Ltda'),
    'Multilaser',
    'AU013',
    120.00,
    189.90,
    8,
    3,
    30,
    'UN',
    'ativo'
UNION ALL
SELECT 
    'Pneu Michelin Primacy 4 205/55 R16',
    'Pneu de alta performance com tecnologia EverGrip',
    'PNEU-001',
    (SELECT id FROM category_ids WHERE name = 'Pneus'),
    (SELECT id FROM supplier_ids WHERE name = 'Pneus & Rodas Express'),
    'Michelin',
    'Primacy 4',
    320.00,
    459.99,
    24,
    8,
    100,
    'UN',
    'ativo'
UNION ALL
SELECT 
    'Pastilha de Freio Bosch Cerâmica',
    'Pastilha de freio cerâmica para maior durabilidade',
    'FREIO-001',
    (SELECT id FROM category_ids WHERE name = 'Freios'),
    (SELECT id FROM supplier_ids WHERE name = 'AutoPeças Brasil Ltda'),
    'Bosch',
    'Cerâmica',
    85.00,
    129.90,
    0,
    10,
    60,
    'UN',
    'ativo'
UNION ALL
SELECT 
    'Óleo Motor Castrol GTX 5W30',
    'Óleo lubrificante sintético para motores modernos',
    'OLEO-001',
    (SELECT id FROM category_ids WHERE name = 'Óleos'),
    (SELECT id FROM supplier_ids WHERE name = 'Óleos & Lubrificantes SA'),
    'Castrol',
    'GTX 5W30',
    55.00,
    89.90,
    32,
    15,
    80,
    'UN',
    'ativo';
