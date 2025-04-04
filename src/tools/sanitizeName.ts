export function sanitizeFilename(filename: string): string {
  return filename
    .replace(/[^a-zA-Z0-9-_\.]/g, "_") // troca caracteres inválidos por "_"
    .replace(/\.+$/, "") // remove pontos finais (evita arquivos ocultos no Linux)
    .slice(0, 100); // limita tamanho (evita erros no sistema)
}
