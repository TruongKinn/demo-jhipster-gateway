package vn.com.java.repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.relational.core.query.Criteria;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import vn.com.java.domain.Task;

/**
 * Spring Data SQL reactive repository for the Task entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TaskRepository extends ReactiveCrudRepository<Task, Long>, TaskRepositoryInternal {
    @Override
    <S extends Task> Mono<S> save(S entity);

    @Override
    Flux<Task> findAll();

    @Override
    Mono<Task> findById(Long id);

    @Override
    Mono<Void> deleteById(Long id);
}

interface TaskRepositoryInternal {
    <S extends Task> Mono<S> save(S entity);

    Flux<Task> findAllBy(Pageable pageable);

    Flux<Task> findAll();

    Mono<Task> findById(Long id);

    Flux<Task> findAllBy(Pageable pageable, Criteria criteria);
}
