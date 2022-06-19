import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { OrderRepository } from './orders.repository';
import { getModelToken } from '@nestjs/mongoose';
import { mockListOrder, mockOrder, mockState, mockUserId } from './orders.mock';
import { resolve } from 'path';

describe('OrdersService', () => {
  let service: OrdersService;

  const mockOrderRepository = {
    create: jest.fn(),
    find: jest.fn(),
    findById: jest.fn(),
    updateStateOrderById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        OrderRepository,
        {
          provide: 'PAYMENT_SERVICE',
          useValue: {},
        },
        {
          provide: getModelToken('Order'),
          useValue: {},
        },
      ],
    })
      .overrideProvider(OrderRepository)
      .useValue(mockOrderRepository)
      .compile();

    service = module.get<OrdersService>(OrdersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should return new order', async () => {
      mockOrderRepository.create.mockImplementation(() =>
        Promise.resolve(mockOrder),
      );

      const result = await service.createOrder(mockOrder, mockUserId);
      expect(result).toEqual(mockOrder);
    });
  });

  describe('getAllOrders', () => {
    it('should return list orders', async () => {
      mockOrderRepository.find.mockImplementation(() =>
        Promise.resolve(mockListOrder),
      );

      const result = await service.getAllOrders();
      expect(result).toEqual(mockListOrder);
    });
  });

  describe('getDetailOrder', () => {
    it('should return a detail order', async () => {
      mockOrderRepository.findById.mockImplementation(() =>
        Promise.resolve(mockOrder),
      );

      const result = await service.getOrderById(mockOrder._id);
      expect(result).toEqual(mockOrder);
    });
  });

  describe('getStateOrder', () => {
    it('should return state of order', async () => {
      mockOrderRepository.findById.mockImplementation(() =>
        Promise.resolve(mockOrder.state),
      );

      const result = await service.getOrderById(mockOrder._id);
      expect(result).toEqual(mockOrder.state);
    });
  });

  describe('updateStateOrderById', () => {
    it('should order update state', async () => {
      mockOrderRepository.updateStateOrderById.mockImplementation(() =>
        Promise.resolve(mockOrder),
      );

      const result = await service.updateStateOrderById(
        mockOrder._id,
        mockState['CANCELED'],
      );
      expect(result).toEqual(mockOrder);
    });
  });
});
