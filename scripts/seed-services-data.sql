-- Inserir serviços de exemplo
INSERT INTO services (name, description, price, status, times_performed) VALUES
('Troca de Óleo', 'Troca completa do óleo do motor com filtro', 89.90, 'ativo', 156),
('Alinhamento e Balanceamento', 'Alinhamento das rodas e balanceamento dos pneus', 120.00, 'ativo', 89),
('Revisão Completa', 'Revisão geral do veículo com checklist completo', 250.00, 'ativo', 45),
('Troca de Pastilhas de Freio', 'Substituição das pastilhas de freio dianteiras', 180.00, 'ativo', 67),
('Instalação de Som', 'Instalação de sistema de som automotivo', 150.00, 'inativo', 23),
('Troca de Pneus', 'Substituição de pneus com balanceamento', 300.00, 'ativo', 34),
('Lavagem Completa', 'Lavagem externa e interna do veículo', 45.00, 'ativo', 234),
('Enceramento', 'Aplicação de cera protetora na pintura', 80.00, 'ativo', 78)
ON CONFLICT DO NOTHING;
