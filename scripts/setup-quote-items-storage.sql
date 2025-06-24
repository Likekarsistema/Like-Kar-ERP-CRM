-- Criar bucket para imagens de itens de orçamento
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'quote-item-images',
  'quote-item-images',
  true,
  5242880, -- 5MB
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
) ON CONFLICT (id) DO NOTHING;

-- Política para permitir upload de imagens (usuários autenticados)
CREATE POLICY "Usuários podem fazer upload de imagens de itens" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'quote-item-images' 
  AND auth.role() = 'authenticated'
);

-- Política para permitir visualização pública das imagens
CREATE POLICY "Imagens de itens são públicas" ON storage.objects
FOR SELECT USING (bucket_id = 'quote-item-images');

-- Política para permitir atualização de imagens (usuários autenticados)
CREATE POLICY "Usuários podem atualizar imagens de itens" ON storage.objects
FOR UPDATE WITH CHECK (
  bucket_id = 'quote-item-images' 
  AND auth.role() = 'authenticated'
);

-- Política para permitir exclusão de imagens (usuários autenticados)
CREATE POLICY "Usuários podem excluir imagens de itens" ON storage.objects
FOR DELETE USING (
  bucket_id = 'quote-item-images' 
  AND auth.role() = 'authenticated'
);
