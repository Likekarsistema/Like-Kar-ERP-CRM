-- Criar bucket para imagens de produtos
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

-- Política para permitir upload de imagens (usuários autenticados)
CREATE POLICY "Usuários podem fazer upload de imagens de produtos"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'product-images' 
  AND auth.role() = 'authenticated'
);

-- Política para permitir visualização pública das imagens
CREATE POLICY "Imagens de produtos são públicas"
ON storage.objects FOR SELECT
USING (bucket_id = 'product-images');

-- Política para permitir exclusão de imagens (usuários autenticados)
CREATE POLICY "Usuários podem excluir suas imagens"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'product-images' 
  AND auth.role() = 'authenticated'
);

-- Política para permitir atualização de imagens (usuários autenticados)
CREATE POLICY "Usuários podem atualizar imagens"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'product-images' 
  AND auth.role() = 'authenticated'
);
