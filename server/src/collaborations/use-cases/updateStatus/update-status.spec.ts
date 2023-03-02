import { UpdateStatus } from './update-status';

describe('Update a collaboration status', () => {
  let inMemoryCollaborationsRepository: InMemoryCollaborationsRepository;
  let sut: UpdateStatus;

  beforeEach(() => {
    inMemoryCollaborationsRepository = new InMemoryCollaborationsRepository();
    sut = new UpdateStatus(inMemoryCollaborationsRepository);
  });

  it('should be able to update a collaboration status', async () => {
    const collaboration = await inMemoryCollaborationsRepository.register({
      type: 'Code Review',
      url: 'https://github.com/Grupo-GCB/academy-gamification/pull/14',
      collaborator_id: '1',
      status: 'pending',
    });

    const updatedCollaboration = await sut.execute({
      collaboration_id: collaboration.collaboration_id,
      newStatus: 'approved',
    });
    expect(updatedCollaboration.status).toEqual('approved');

    await expect(
      inMemoryCollaborationsRepository.findById(collaboration.collaboration_id),
    ).resolves.toEqual(
      expect.objectContaining({
        status: 'approved',
      }),
    );
  });

  it('should not be able to update a nonexistent collaboration status', async () => {
    await expect(
      sut.execute({
        collaboration_id: '52ec6f4e-091f-46e5-ac7b-6ef8c4d895af',
        newStatus: 'approved',
      }),
    ).rejects.toThrow('Collaboration does not exist!');
  });

  it('should not be able to update a collaboration status to invalid status', async () => {
    const collaboration = await inMemoryCollaborationsRepository.register({
      type: 'Code Review',
      url: 'https://github.com/Grupo-GCB/academy-gamification/pull/14',
      collaborator_id: '1',
      status: 'pending',
    });

    await expect(
      sut.execute({
        collaboration_id: collaboration.collaboration_id,
        newStatus: 'invalid status',
      }),
    ).rejects.toThrow('Invalid status!');
  });
});
