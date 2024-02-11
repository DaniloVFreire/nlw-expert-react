import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { ChangeEvent, FormEvent, useState } from 'react';
import { toast } from 'sonner';

interface NewNoteCardProps {
  onNoteCreated: (content: string) => void;
}

export function NewNoteCard({ onNoteCreated }: NewNoteCardProps) {
  const [shouldShowOnBoarding, setShouldShowOnBoarding] = useState(true);
  const [content, setContent] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  function handleStartEditor() {
    setShouldShowOnBoarding(false);
  }

  function handleContentChanged(event: ChangeEvent<HTMLTextAreaElement>) {
    let userTypedText = event.target.value;
    setContent(userTypedText);
    console.log(userTypedText);
    if (userTypedText === '') {
      setShouldShowOnBoarding(true);
    }
  }

  function handleSaveNote(event: FormEvent) {
    //Remove efeito padrão da tag form, que é recarregar a página
    event.preventDefault();
    if (content === '') {
      return;
    }
    onNoteCreated(content);
    setContent('');
    setShouldShowOnBoarding(true);
    toast.success('nota criada com sucesso!');
  }

  function handleStartRecording() {
    const isSpeechRecognitionAvailable =
      'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;

    if (!isSpeechRecognitionAvailable) {
      toast.error(
        'Infelizmente seu navegador não suporta o reconhecimento de fala'
      );
      setIsRecording(false);
      return;
    }
    setIsRecording(true);
    setShouldShowOnBoarding(false);
    const SpeechRecognitionApi =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const SpeechRecognition = new SpeechRecognitionApi();
    SpeechRecognition.lang = 'pt-BR';
    SpeechRecognition.continuous = true; //Não para o reconhecimento se tiver pausas na fala
    SpeechRecognition.maxAlternatives = 1; // Limita opções de palavras com duvida, pegando o primeiro reconhecido
    SpeechRecognition.interimResults = true; // retorna em tempo de reconhecimento
    SpeechRecognition.onresult = event => {
      event.results;
    };
    SpeechRecognition.onerror = event => {
      console.log(event);
    };
  }
  function handleStopRecording() {
    setIsRecording(false);
  }
  return (
    <Dialog.Root>
      <Dialog.Trigger
        className="rounded-md bg-slate-700 p-5
      flex flex-col text-left gap-3 outline-none hover:ring-2 hover:ring-slate-600
      focus-visible:ring-2 focus-visible:ring-lime-400  "
      >
        <span className="text-sm font-medium text-slate-200 ">
          Adicionar nota
        </span>
        <p className="text-sm leading-6 text-slate-400">
          Grave uma nota em áudio que será convertida para texto
          automaticamente.
        </p>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="inset-0 fixed bg-black/60" />
        <Dialog.Content
          className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
         max-w-[640px] w-full h-[60vh]
          bg-slate-700 rounded-md outline-none overflow-hidden
           flex flex-col "
        >
          <Dialog.Close
            className="absolute right-0 top-0 bg-slate-800 p-1.5
           text-slate-400 hover:text-slate-100"
          >
            <X className="size-5" />
          </Dialog.Close>
          <form className="flex-1 flex flex-col">
            <div className="flex flex-1 flex-col gap-3 p-5">
              <span className="text-sm leading-6 text-slate-300">
                Adicionar nota
              </span>
              {shouldShowOnBoarding ? (
                <p className="text-sm leading-6 text-slate-400">
                  Comece{' '}
                  <button
                    type="button"
                    onClick={handleStartRecording}
                    className="font-medium text-lime-400 hover:underline"
                  >
                    gravando uma nota
                  </button>{' '}
                  em áudio ou se preferir{' '}
                  <button
                    type="button"
                    onClick={handleStartEditor}
                    className="font-medium text-lime-400 hover:underline"
                  >
                    utilize apenas texto
                  </button>
                  .
                </p>
              ) : (
                <textarea
                  autoFocus
                  className="text-sm leading-6 text-slate-400 
                bg-transparent resize-none flex-1 outline-none"
                  onChange={handleContentChanged}
                  value={content}
                />
              )}
            </div>
            {isRecording ? (
              <button
                type="button"
                className="w-full bg-slate-900 py-4 text-center text-sm
            text-slate-300 outline-none font-medium hover:text-slate-100
            flex items-center justify-center gap-2"
                onClick={handleStopRecording}
              >
                <div className="size-3 rounded-full bg-red-500 animate-pulse" />
                Gravando! (clique para interromper)
              </button>
            ) : (
              <button
                type="button"
                className="w-full bg-lime-400 py-4 text-center text-sm
            text-lime-950 outline-none font-medium hover:bg-lime-500"
                onClick={handleSaveNote}
              >
                Salvar nota
              </button>
            )}
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
