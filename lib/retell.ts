export interface RetellCallConfig {
  accessToken: string;
  callId: string;
  onStart?: () => void;
  onTranscript?: (update: TranscriptUpdate) => void;
  onError?: (error: Error) => void;
  onEnd?: () => void;
}

export interface TranscriptUpdate {
  role: "agent" | "user";
  text: string;
  timestamp: number;
}

export class RetellWebCall {
  private config: RetellCallConfig;
  private ws: WebSocket | null = null;
  private mediaStream: MediaStream | null = null;
  private audioContext: AudioContext | null = null;
  private isConnected: boolean = false;

  constructor(config: RetellCallConfig) {
    this.config = config;
  }

  async start(): Promise<void> {
    try {
      this.mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });

      this.audioContext = new AudioContext({
        sampleRate: 24000,
      });

      await this.connectWebSocket();
      this.isConnected = true;
      this.config.onStart?.();
    } catch (error) {
      this.config.onError?.(error as Error);
      throw error;
    }
  }

  private connectWebSocket(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        const wsUrl = \wss://api.retellai.com/v2/audio/websocket?access_token=\\;
        
        this.ws = new WebSocket(wsUrl);

        this.ws.onopen = () => {
          console.log("Retell WebSocket connected");
          this.startAudioStreaming();
          resolve();
        };

        this.ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            
            switch (data.event) {
              case "transcript":
                this.config.onTranscript?.({
                  role: data.role || "agent",
                  text: data.text || "",
                  timestamp: Date.now(),
                });
                break;
              
              case "error":
                console.error("Retell WebSocket error:", data);
                this.config.onError?.(new Error(data.message || "WebSocket error"));
                break;
              
              case "call_end":
                this.cleanup();
                this.config.onEnd?.();
                break;
              
              default:
                console.log("Retell event:", data);
            }
          } catch (parseError) {
            console.error("Error parsing WebSocket message:", parseError);
          }
        };

        this.ws.onerror = (error) => {
          console.error("WebSocket error:", error);
          reject(new Error("WebSocket connection failed"));
        };

        this.ws.onclose = (event) => {
          console.log("WebSocket closed:", event.code, event.reason);
          if (!this.isConnected) {
            reject(new Error("WebSocket closed before connection"));
          }
          this.cleanup();
          this.config.onEnd?.();
        };
      } catch (error) {
        reject(error);
      }
    });
  }

  private startAudioStreaming(): void {
    if (!this.mediaStream || !this.audioContext || !this.ws) {
      throw new Error("Audio components not initialized");
    }

    const source = this.audioContext.createMediaStreamSource(this.mediaStream);
    const processor = this.audioContext.createScriptProcessor(4096, 1, 1);
    
    source.connect(processor);
    processor.connect(this.audioContext.destination);

    processor.onaudioprocess = (event) => {
      if (this.ws?.readyState === WebSocket.OPEN) {
        const inputData = event.inputBuffer.getChannelData(0);
        const int16Array = this.float32ToInt16(inputData);
        this.ws.send(int16Array.buffer);
      }
    };
  }

  private float32ToInt16(float32Array: Float32Array): Int16Array {
    const int16Array = new Int16Array(float32Array.length);
    for (let i = 0; i < float32Array.length; i++) {
      const s = Math.max(-1, Math.min(1, float32Array[i]));
      int16Array[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
    }
    return int16Array;
  }

  stop(): void {
    this.cleanup();
    this.config.onEnd?.();
  }

  private cleanup(): void {
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach((track) => track.stop());
      this.mediaStream = null;
    }

    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }

    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }

    this.isConnected = false;
  }
}

