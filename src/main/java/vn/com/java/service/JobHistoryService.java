package vn.com.java.service;

import org.springframework.data.domain.Pageable;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import vn.com.java.service.dto.JobHistoryDTO;

/**
 * Service Interface for managing {@link vn.com.java.domain.JobHistory}.
 */
public interface JobHistoryService {
    /**
     * Save a jobHistory.
     *
     * @param jobHistoryDTO the entity to save.
     * @return the persisted entity.
     */
    Mono<JobHistoryDTO> save(JobHistoryDTO jobHistoryDTO);

    /**
     * Partially updates a jobHistory.
     *
     * @param jobHistoryDTO the entity to update partially.
     * @return the persisted entity.
     */
    Mono<JobHistoryDTO> partialUpdate(JobHistoryDTO jobHistoryDTO);

    /**
     * Get all the jobHistories.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Flux<JobHistoryDTO> findAll(Pageable pageable);

    /**
     * Returns the number of jobHistories available.
     * @return the number of entities in the database.
     *
     */
    Mono<Long> countAll();

    /**
     * Get the "id" jobHistory.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Mono<JobHistoryDTO> findOne(Long id);

    /**
     * Delete the "id" jobHistory.
     *
     * @param id the id of the entity.
     * @return a Mono to signal the deletion
     */
    Mono<Void> delete(Long id);
}
