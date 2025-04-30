import { io, Socket } from 'socket.io-client';

class SocketService {
  private socket: Socket | null = null;
  private token: string | null = null;

  // Initialize socket connection
  init(token: string) {
    if (this.socket) {
      this.socket.disconnect();
    }

    this.token = token;

    // Use the correct backend URL
    const backendUrl = 'http://localhost:5000';
    this.socket = io(backendUrl, {
      auth: {
        token,
      },
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    this.socket.on('connect', () => {
      console.log('Socket connected successfully');
    });

    this.socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error.message);
    });

    this.socket.on('disconnect', (reason) => {
      console.log('Socket disconnected:', reason);
    });

    this.socket.on('error', (error) => {
      console.error('Socket error:', error);
    });

    return this.socket;
  }

  // Get socket instance
  getSocket(): Socket {
    if (!this.socket) {
      const token = localStorage.getItem('token');
      if (token) {
        this.init(token);
      } else {
        throw new Error('No authentication token available');
      }
    }

    if (!this.socket) {
      throw new Error('Failed to initialize socket connection');
    }

    return this.socket;
  }

  // Join a project room to receive real-time updates
  joinProject(projectId: string) {
    const socket = this.getSocket();
    socket.emit('join_project', projectId);
  }

  // Join a chat room to receive real-time messages
  joinChat(userId: string) {
    const socket = this.getSocket();
    const chatId = [socket.id, userId].sort().join('-');
    socket.emit('join_chat', chatId);
    return chatId;
  }

  // Listen for new bids on a project
  onNewBid(callback: (data: any) => void) {
    const socket = this.getSocket();
    socket.on('new-bid', callback);
    return () => socket.off('new-bid', callback);
  }

  // Listen for bid updates
  onBidUpdated(callback: (data: any) => void) {
    const socket = this.getSocket();
    socket.on('bid-updated', callback);
    return () => socket.off('bid-updated', callback);
  }

  // Listen for bid deletions
  onBidDeleted(callback: (data: any) => void) {
    const socket = this.getSocket();
    socket.on('bid-deleted', callback);
    return () => socket.off('bid-deleted', callback);
  }

  // Listen for bid acceptance
  onBidAccepted(callback: (data: any) => void) {
    const socket = this.getSocket();
    socket.on('bid-accepted', callback);
    return () => socket.off('bid-accepted', callback);
  }

  // Listen for bid rejection
  onBidRejected(callback: (data: any) => void) {
    const socket = this.getSocket();
    socket.on('bid-rejected', callback);
    return () => socket.off('bid-rejected', callback);
  }

  // Listen for counter offers
  onBidCountered(callback: (data: any) => void) {
    const socket = this.getSocket();
    socket.on('bid-countered', callback);
    return () => socket.off('bid-countered', callback);
  }

  // Listen for counter offer acceptance
  onCounterAccepted(callback: (data: any) => void) {
    const socket = this.getSocket();
    socket.on('counter-accepted', callback);
    return () => socket.off('counter-accepted', callback);
  }

  // Listen for new messages
  onNewMessage(callback: (data: any) => void) {
    const socket = this.getSocket();
    socket.on('new-message', callback);
    return () => socket.off('new-message', callback);
  }

  // Disconnect socket
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }
}

// Export singleton instance
const socketService = new SocketService();
export default socketService;
