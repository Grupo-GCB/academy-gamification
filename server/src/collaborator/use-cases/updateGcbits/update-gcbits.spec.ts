describe('Update gcbits value in an wallet', () => {
    let inMemoryWalletsRepository: InMemoryWalletsRepository;
    let sut: UpdateGcbits;
  
    beforeEach(() => {
        inMemoryWalletsRepository = new InMemoryWalletsRepository();
      sut = new UpdateGcbits(inMemoryWalletsRepository);
    });
  
    it('should be able to update an gcbits value in wallet', async () => {
      const transaction = await inMemoryTransactionsRepository.register({
        collaborator_id: '08695ca2-1f95-4383-b92f-7e44fb8bd950',
        business_unit: BusinessUnits.ADIANTE,
        reason: TransactionReasons.COLLABORATION,
        type: 'Code_Review',
        academys: [
          'c13f866c-2ba0-42b7-83c9-50bb61c5c167',
          '70c2be1a-ef21-4ae7-a8d0-375ddf026920',
        ],
        status: CollaborationsStatus.PENDING,
        gcbits: 5000,
      });
    })
})