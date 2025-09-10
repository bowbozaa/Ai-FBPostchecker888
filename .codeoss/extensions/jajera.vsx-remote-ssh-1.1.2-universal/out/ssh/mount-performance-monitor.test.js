"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Tests for MountPerformanceMonitor
 */
const vitest_1 = require("vitest");
const mount_performance_monitor_1 = require("./mount-performance-monitor");
// Mock vscode module
vitest_1.vi.mock('vscode', () => ({
    window: {
        createStatusBarItem: vitest_1.vi.fn(() => ({
            text: '',
            tooltip: '',
            command: '',
            show: vitest_1.vi.fn(),
            dispose: vitest_1.vi.fn()
        })),
        showInformationMessage: vitest_1.vi.fn(),
        createWebviewPanel: vitest_1.vi.fn(() => ({
            webview: {
                html: '',
                cspSource: 'test',
                onDidReceiveMessage: vitest_1.vi.fn()
            },
            onDidDispose: vitest_1.vi.fn(),
            visible: true
        }))
    },
    commands: {
        registerCommand: vitest_1.vi.fn(() => ({ dispose: vitest_1.vi.fn() }))
    },
    StatusBarAlignment: {
        Right: 2
    },
    ViewColumn: {
        One: 1
    },
    Uri: {
        parse: vitest_1.vi.fn((uri) => ({
            path: uri.replace('mount://', '/'),
            scheme: 'mount'
        }))
    }
}));
(0, vitest_1.describe)('MountPerformanceMonitor', () => {
    let monitor;
    (0, vitest_1.beforeEach)(() => {
        // Reset singleton instance
        mount_performance_monitor_1.MountPerformanceMonitor.instance = undefined;
        monitor = mount_performance_monitor_1.MountPerformanceMonitor.getInstance();
    });
    (0, vitest_1.afterEach)(() => {
        monitor.dispose();
        vitest_1.vi.clearAllMocks();
    });
    (0, vitest_1.describe)('Performance Metrics Collection', () => {
        (0, vitest_1.it)('should record mount operation metrics', () => {
            const mountId = 'test-mount-1';
            const operationType = mount_performance_monitor_1.MountOperationType.MountRead;
            const duration = 150;
            const dataSize = 1024;
            monitor.recordMountOperation(operationType, duration, true, 'mount://test/file.txt', 'ssh://user@host/file.txt', mountId, dataSize, undefined, true);
            // Verify metrics were recorded
            const pattern = monitor.getUsagePattern(mountId);
            (0, vitest_1.expect)(pattern).toBeDefined();
            (0, vitest_1.expect)(pattern.mountId).toBe(mountId);
        });
        (0, vitest_1.it)('should track usage patterns correctly', () => {
            const mountId = 'test-mount-2';
            // Record multiple operations
            for (let i = 0; i < 5; i++) {
                monitor.recordMountOperation(mount_performance_monitor_1.MountOperationType.MountRead, 100 + i * 10, true, `mount://test/file${i}.txt`, `ssh://user@host/file${i}.txt`, mountId, 1024 * (i + 1), undefined, i % 2 === 0);
            }
            const pattern = monitor.getUsagePattern(mountId);
            (0, vitest_1.expect)(pattern).toBeDefined();
            (0, vitest_1.expect)(pattern.frequentFiles.length).toBeGreaterThan(0);
            (0, vitest_1.expect)(pattern.readWriteRatio).toBeGreaterThan(0);
            (0, vitest_1.expect)(pattern.averageFileSize).toBeGreaterThan(0);
        });
        (0, vitest_1.it)('should update hourly activity patterns', () => {
            const mountId = 'test-mount-3';
            const currentHour = new Date().getHours();
            monitor.recordMountOperation(mount_performance_monitor_1.MountOperationType.MountList, 50, true, 'mount://test/', 'ssh://user@host/', mountId);
            const pattern = monitor.getUsagePattern(mountId);
            (0, vitest_1.expect)(pattern).toBeDefined();
            (0, vitest_1.expect)(pattern.hourlyActivity[currentHour]).toBeGreaterThan(0);
        });
    });
    (0, vitest_1.describe)('Network Condition Monitoring', () => {
        (0, vitest_1.it)('should record network conditions', () => {
            const mountId = 'test-mount-4';
            const latency = 75;
            const bandwidth = 8000000; // 8 MB/s
            const packetLoss = 0.5;
            monitor.recordNetworkCondition(mountId, latency, bandwidth, packetLoss);
            const stats = monitor.getNetworkStatistics(mountId);
            (0, vitest_1.expect)(stats).toBeDefined();
            (0, vitest_1.expect)(stats.currentCondition.latency).toBe(latency);
            (0, vitest_1.expect)(stats.currentCondition.bandwidth).toBe(bandwidth);
            (0, vitest_1.expect)(stats.currentCondition.quality).toBe(mount_performance_monitor_1.NetworkQuality.Good);
        });
        (0, vitest_1.it)('should classify network quality correctly', () => {
            const mountId = 'test-mount-5';
            // Test excellent quality
            monitor.recordNetworkCondition(mountId, 25, 15000000, 0.05);
            let stats = monitor.getNetworkStatistics(mountId);
            (0, vitest_1.expect)(stats.currentCondition.quality).toBe(mount_performance_monitor_1.NetworkQuality.Excellent);
            // Test poor quality
            monitor.recordNetworkCondition(mountId, 500, 500000, 10);
            stats = monitor.getNetworkStatistics(mountId);
            (0, vitest_1.expect)(stats.currentCondition.quality).toBe(mount_performance_monitor_1.NetworkQuality.Poor);
            // Test offline
            monitor.recordNetworkCondition(mountId, 2000, 0, 100);
            stats = monitor.getNetworkStatistics(mountId);
            (0, vitest_1.expect)(stats.currentCondition.quality).toBe(mount_performance_monitor_1.NetworkQuality.Offline);
        });
        (0, vitest_1.it)('should calculate network trends', () => {
            const mountId = 'test-mount-6';
            // Record improving trend (decreasing latency)
            monitor.recordNetworkCondition(mountId, 200, 1000000, 1);
            monitor.recordNetworkCondition(mountId, 150, 1000000, 1);
            monitor.recordNetworkCondition(mountId, 100, 1000000, 1);
            const stats = monitor.getNetworkStatistics(mountId);
            (0, vitest_1.expect)(stats.trend).toBe('improving');
        });
    });
    (0, vitest_1.describe)('Adaptive Caching', () => {
        (0, vitest_1.it)('should initialize default cache settings', () => {
            const mountId = 'test-mount-7';
            const settings = monitor.getAdaptiveCacheSettings(mountId);
            (0, vitest_1.expect)(settings.mountId).toBe(mountId);
            (0, vitest_1.expect)(settings.cacheSizeLimit).toBe(50 * 1024 * 1024); // 50MB
            (0, vitest_1.expect)(settings.cacheTtl).toBe(300000); // 5 minutes
            (0, vitest_1.expect)(settings.prefetchEnabled).toBe(false);
            (0, vitest_1.expect)(settings.compressionEnabled).toBe(false);
        });
        (0, vitest_1.it)('should generate optimization recommendations', () => {
            const mountId = 'test-mount-8';
            // Set up usage pattern with frequent directory access
            for (let i = 0; i < 10; i++) {
                monitor.recordMountOperation(mount_performance_monitor_1.MountOperationType.MountList, 100, true, `mount://test/dir${i % 3}/`, `ssh://user@host/dir${i % 3}/`, mountId);
            }
            // Set up poor network conditions
            monitor.recordNetworkCondition(mountId, 800, 200000, 15);
            const recommendations = monitor.generateOptimizationRecommendations(mountId);
            (0, vitest_1.expect)(recommendations.length).toBeGreaterThan(0);
            // Should recommend prefetching due to frequent directory access
            const prefetchRec = recommendations.find((r) => r.type === 'prefetch');
            (0, vitest_1.expect)(prefetchRec).toBeDefined();
            (0, vitest_1.expect)(prefetchRec.recommendedValue).toBe(true);
            // Should recommend longer cache TTL due to poor network
            const cacheTtlRec = recommendations.find((r) => r.type === 'cache_ttl');
            (0, vitest_1.expect)(cacheTtlRec).toBeDefined();
        });
    });
    (0, vitest_1.describe)('Performance Benchmarks', () => {
        (0, vitest_1.it)('should measure operation performance accurately', async () => {
            const mountId = 'benchmark-mount';
            const operationCount = 100;
            const startTime = Date.now();
            // Simulate multiple operations
            for (let i = 0; i < operationCount; i++) {
                const operationId = monitor.startMountOperation(mount_performance_monitor_1.MountOperationType.MountRead, `mount://test/file${i}.txt`, `ssh://user@host/file${i}.txt`, mountId);
                // Simulate some processing time
                await new Promise(resolve => setTimeout(resolve, Math.random() * 10));
                monitor.endMountOperation(operationId, true, 1024 * (i + 1));
            }
            const totalTime = Date.now() - startTime;
            const pattern = monitor.getUsagePattern(mountId);
            (0, vitest_1.expect)(pattern).toBeDefined();
            (0, vitest_1.expect)(pattern.frequentFiles.length).toBeGreaterThan(0);
            (0, vitest_1.expect)(totalTime).toBeLessThan(5000); // Should complete within 5 seconds
        });
        (0, vitest_1.it)('should handle high-frequency operations efficiently', () => {
            const mountId = 'high-freq-mount';
            const operationCount = 1000;
            const startTime = Date.now();
            // Record many operations quickly
            for (let i = 0; i < operationCount; i++) {
                monitor.recordMountOperation(i % 2 === 0 ? mount_performance_monitor_1.MountOperationType.MountRead : mount_performance_monitor_1.MountOperationType.MountWrite, Math.random() * 100 + 50, Math.random() > 0.1, // 90% success rate
                `mount://test/file${i % 100}.txt`, `ssh://user@host/file${i % 100}.txt`, mountId, Math.floor(Math.random() * 10000) + 1000, undefined, Math.random() > 0.3 // 70% cache hit rate
                );
            }
            const processingTime = Date.now() - startTime;
            const pattern = monitor.getUsagePattern(mountId);
            (0, vitest_1.expect)(pattern).toBeDefined();
            (0, vitest_1.expect)(processingTime).toBeLessThan(1000); // Should process 1000 operations in under 1 second
            (0, vitest_1.expect)(pattern.frequentFiles.length).toBeLessThanOrEqual(10); // Should limit to top 10
        });
        (0, vitest_1.it)('should optimize cache settings based on usage patterns', () => {
            const mountId = 'optimization-mount';
            // Simulate high-activity scenario
            for (let i = 0; i < 150; i++) {
                monitor.recordMountOperation(mount_performance_monitor_1.MountOperationType.MountRead, 100, true, `mount://test/file${i % 20}.txt`, `ssh://user@host/file${i % 20}.txt`, mountId, 2048, undefined, false // Low cache hit rate
                );
            }
            // Set up network conditions
            monitor.recordNetworkCondition(mountId, 100, 5000000, 1);
            const initialSettings = monitor.getAdaptiveCacheSettings(mountId);
            const recommendations = monitor.generateOptimizationRecommendations(mountId);
            (0, vitest_1.expect)(recommendations.length).toBeGreaterThan(0);
            // Should recommend cache size increase due to high activity and low cache hit rate
            const cacheSizeRec = recommendations.find((r) => r.type === 'cache_size');
            (0, vitest_1.expect)(cacheSizeRec).toBeDefined();
            (0, vitest_1.expect)(cacheSizeRec.recommendedValue).toBeGreaterThan(initialSettings.cacheSizeLimit);
        });
    });
    (0, vitest_1.describe)('Memory and Resource Management', () => {
        (0, vitest_1.it)('should limit metrics collection size', () => {
            const mountId = 'memory-test-mount';
            const maxMetrics = 1000;
            // Record more metrics than the limit
            for (let i = 0; i < maxMetrics + 100; i++) {
                monitor.recordMountOperation(mount_performance_monitor_1.MountOperationType.MountRead, 100, true, `mount://test/file${i}.txt`, `ssh://user@host/file${i}.txt`, mountId);
            }
            // Access private metrics to verify size limit
            const mountMetrics = monitor.mountMetrics.get(mountId);
            (0, vitest_1.expect)(mountMetrics.length).toBeLessThanOrEqual(maxMetrics);
        });
        (0, vitest_1.it)('should limit network condition history', () => {
            const mountId = 'network-limit-mount';
            const maxConditions = 100;
            // Record more conditions than the limit
            for (let i = 0; i < maxConditions + 20; i++) {
                monitor.recordNetworkCondition(mountId, 100 + i, 1000000, 1);
            }
            const networkConditions = monitor.networkConditions.get(mountId);
            (0, vitest_1.expect)(networkConditions.length).toBeLessThanOrEqual(maxConditions);
        });
        (0, vitest_1.it)('should clean up resources on dispose', () => {
            const disposeSpy = vitest_1.vi.spyOn(monitor, 'dispose');
            monitor.dispose();
            (0, vitest_1.expect)(disposeSpy).toHaveBeenCalled();
            // Verify intervals are cleared
            (0, vitest_1.expect)(monitor.networkMonitoringInterval).toBeUndefined();
            (0, vitest_1.expect)(monitor.adaptiveCachingInterval).toBeUndefined();
        });
    });
    (0, vitest_1.describe)('Error Handling', () => {
        (0, vitest_1.it)('should handle invalid URIs gracefully', () => {
            const mountId = 'error-test-mount';
            (0, vitest_1.expect)(() => {
                monitor.recordMountOperation(mount_performance_monitor_1.MountOperationType.MountRead, 100, true, 'invalid-uri', 'ssh://user@host/file.txt', mountId);
            }).not.toThrow();
            const pattern = monitor.getUsagePattern(mountId);
            (0, vitest_1.expect)(pattern).toBeDefined();
        });
        (0, vitest_1.it)('should handle missing mount data gracefully', () => {
            const nonExistentMountId = 'non-existent-mount';
            const stats = monitor.getNetworkStatistics(nonExistentMountId);
            (0, vitest_1.expect)(stats).toBeUndefined();
            const pattern = monitor.getUsagePattern(nonExistentMountId);
            (0, vitest_1.expect)(pattern).toBeUndefined();
            const recommendations = monitor.generateOptimizationRecommendations(nonExistentMountId);
            (0, vitest_1.expect)(recommendations).toEqual([]);
        });
        (0, vitest_1.it)('should handle disabled monitoring', () => {
            // Disable monitoring
            monitor.isMonitoringEnabled = false;
            const operationId = monitor.startMountOperation(mount_performance_monitor_1.MountOperationType.MountRead, 'mount://test/file.txt', 'ssh://user@host/file.txt', 'test-mount');
            (0, vitest_1.expect)(operationId).toBe('');
            monitor.recordNetworkCondition('test-mount', 100, 1000000, 1);
            const stats = monitor.getNetworkStatistics('test-mount');
            (0, vitest_1.expect)(stats).toBeUndefined();
        });
    });
});
//# sourceMappingURL=mount-performance-monitor.test.js.map